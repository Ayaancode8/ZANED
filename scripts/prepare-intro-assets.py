"""Rebuild the intro derivatives using Pillow and the installed GStreamer tools.

Source media stays in assets/motion_assets. These files are build-time assets;
Pillow and GStreamer are not website dependencies.
"""
from pathlib import Path
import subprocess
import gi
from PIL import Image, PngImagePlugin

gi.require_version('Gst', '1.0')
from gi.repository import Gst

Gst.init(None)
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/motion_assets'
OUTPUT = ROOT / 'assets/intro'
OUTPUT.mkdir(exist_ok=True)
VIDEOS = {
    'unbserved': ('unbserved_ssspin.io_1794379450.mp4', 204, 256),
    'hedrabionics': ('hedrabionics_ssspin.io_1794380489.mp4', 144, 256),
    'yzavoku': ('YZAVoku_ssspin.io_1794380356.mp4', 144, 256),
    'circusofartifice': ('circusofartifice_ssspin.io_1794379496.mp4', 192, 256),
}


def provenance(path, source):
    with Image.open(path) as image:
        info = PngImagePlugin.PngInfo()
        origin = f'User-supplied assets/motion_assets/{source}; resized derivative or first-frame video poster. No generated imagery.'
        info.add_text('Source', origin)
        info.add_text('impeccable:prompt', origin)
        image.save(path, optimize=True, pnginfo=info)


def encode_clip(source, output, width, height):
    # Feed exactly 126 frames with fresh timestamps; source MP4 timestamps vary.
    decoder = Gst.parse_launch(
        f'filesrc location="{source}" ! decodebin ! videoconvert ! videoscale ! '
        f'video/x-raw,format=I420,width={width},height={height},pixel-aspect-ratio=1/1 ! '
        'appsink name=frames sync=false max-buffers=2')
    encoder = Gst.parse_launch(
        f'appsrc name=frames format=time block=true caps="video/x-raw,format=I420,'
        f'width={width},height={height},framerate=30/1,pixel-aspect-ratio=1/1" ! '
        'x264enc bitrate=180 speed-preset=slow tune=zerolatency key-int-max=30 ! '
        'video/x-h264,profile=baseline,stream-format=avc,alignment=au ! '
        f'mp4mux faststart=true ! filesink location="{output}"')
    try:
        decoder.set_state(Gst.State.PLAYING)
        encoder.set_state(Gst.State.PLAYING)
        sink = decoder.get_by_name('frames')
        feed = encoder.get_by_name('frames')
        for index in range(126):
            sample = sink.emit('try-pull-sample', 10 * Gst.SECOND)
            if sample is None:
                raise RuntimeError(f'Cannot decode frame {index} from {source}')
            buffer = sample.get_buffer().copy_deep()
            buffer.pts = index * Gst.SECOND // 30
            buffer.dts = Gst.CLOCK_TIME_NONE
            buffer.duration = (index + 1) * Gst.SECOND // 30 - buffer.pts
            if feed.emit('push-buffer', buffer) != Gst.FlowReturn.OK:
                raise RuntimeError(f'Cannot encode {output}')
        feed.emit('end-of-stream')
        message = encoder.get_bus().timed_pop_filtered(30 * Gst.SECOND, Gst.MessageType.EOS | Gst.MessageType.ERROR)
        if message is None or message.type == Gst.MessageType.ERROR:
            raise RuntimeError(f'Cannot finish {output}: {message.parse_error() if message else "timeout"}')
    finally:
        decoder.set_state(Gst.State.NULL)
        encoder.set_state(Gst.State.NULL)


for name, (source, width, height) in VIDEOS.items():
    encode_clip(SOURCE / source, OUTPUT / (name + '.mp4'), width, height)
    common = ['gst-launch-1.0', '-q', 'filesrc', f'location={SOURCE / source}',
              '!', 'decodebin', '!', 'videoconvert', '!', 'videoscale',
              '!', f'video/x-raw,width={width},height={height},pixel-aspect-ratio=1/1']
    poster = OUTPUT / (name + '.png')
    subprocess.run(common + ['!', 'pngenc', 'snapshot=true', '!', 'filesink',
                            f'location={poster}'], check=True)
    provenance(poster, source)

for source in sorted(SOURCE.glob('*.png')):
    target = OUTPUT / source.name
    with Image.open(source) as image:
        image.thumbnail((320, 320), Image.Resampling.LANCZOS)
        image.save(target, optimize=True)
    provenance(target, source.name)

files = list(OUTPUT.glob('*.png')) + list(OUTPUT.glob('*.mp4'))
size = sum(path.stat().st_size for path in files)
assert size < 1_500_000, f'Intro payload exceeds 1.5 MB: {size:,} bytes'
print(f'{len(files)} derivatives: {size:,} bytes ({size / 1_000_000:.2f} MB)')
