import { useEffect, useId, useRef, useState } from 'react';
import './GlassSurface.css';

// SVG capsule material adapted from React Bits Glass Surface (MIT).
// https://reactbits.dev/components/glass-surface — license: public/licenses/react-bits.txt
// Only the rounded SVG path is needed here; omit the shape and WebGL renderers.
export default function GlassSurface({ as: Element = 'div', children, className = '', ...props }) {
  const id = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const surfaceRef = useRef(null);
  const mapRef = useRef(null);
  const [refractive, setRefractive] = useState(false);

  useEffect(() => {
    // Safari and Firefox parse SVG backdrop URLs but don't render this filter reliably.
    const fallback = /Firefox|Safari/.test(navigator.userAgent) && !/Chrome|Chromium/.test(navigator.userAgent);
    setRefractive(!fallback && CSS.supports('backdrop-filter', `url(#${id})`));
  }, [id]);

  useEffect(() => {
    if (!refractive) return;
    const surface = surfaceRef.current;
    const updateMap = () => {
      const width = surface.offsetWidth;
      const height = surface.offsetHeight;
      if (!width || !height) return;
      const radius = height / 2;
      const edge = height * 0.08;
      const map = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%"><stop stop-color="#0000"/><stop offset="1" stop-color="red"/></linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%"><stop stop-color="#0000"/><stop offset="1" stop-color="blue"/></linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <rect width="${width}" height="${height}" fill="black"/>
        <rect width="${width}" height="${height}" rx="${radius}" fill="url(#red)"/>
        <rect width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode:difference"/>
        <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="#808080" filter="url(#soft)"/>
      </svg>`;
      mapRef.current?.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(map)}`);
    };
    updateMap();
    const observer = new ResizeObserver(updateMap);
    observer.observe(surface);
    return () => observer.disconnect();
  }, [refractive]);

  return (
    <Element
      {...props}
      ref={surfaceRef}
      className={`glass-surface ${refractive ? 'glass-surface--refractive' : 'glass-surface--frosted'} ${className}`}
      style={{ '--glass-filter': `url(#${id})`, ...props.style }}
    >
      <svg className="glass-surface__filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id={id} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={mapRef} width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-22" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      {children}
    </Element>
  );
}
