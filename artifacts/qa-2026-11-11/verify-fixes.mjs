// Requires Playwright; ZANED_PLAYWRIGHT_MODULE can point to an existing installation.
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.ZANED_PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true,
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const selectors = '.zaned-hero__background, .zaned-hero__content, .zaned-hero__artworks, .zaned-hero__artwork';
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  const failures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const network = await page.context().newCDPSession(page);
  await network.send('Network.enable');
  network.on('Network.responseReceived', ({ response }) => {
    if (response.status >= 400) failures.push(`${response.status} ${response.url}`);
  });
  await page.goto(base);
  const iconUrl = await page.locator('link[rel="icon"]').evaluate(node => node.href);
  const icon = await page.request.get(iconUrl);
  assert.equal(icon.status(), 200);
  assert.match(icon.headers()['content-type'], /image\/svg\+xml/);
  assert.match(await icon.text(), /<svg/);
  console.log('PASS: Declared ZANED favicon returns a valid SVG with HTTP 200');
  await page.waitForSelector('.brand-intro');
  await page.keyboard.press('Escape');
  for (let trial = 1; trial <= 3; trial++) {
    await page.waitForFunction(() => document.querySelector('.zaned-hero__artworks')?.style.transform);
    await page.mouse.move(1100, 500);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(selectors => [...document.querySelectorAll(selectors)]
      .every(node => !node.style.transform && !node.style.willChange), selectors, { timeout: 5000 });
    await page.waitForTimeout(200);
    assert(await page.locator(selectors).evaluateAll(nodes => nodes.every(node => !node.style.transform && !node.style.willChange)));
    console.log(`PASS: Native reduced-motion transition ${trial} restores every camera layer and stays static`);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => document.querySelector('.zaned-hero__artworks').style.transform, null, { timeout: 5000 });
    const pose = await page.locator('.zaned-hero__artworks').evaluate(node => node.style.transform);
    await page.waitForFunction(pose => document.querySelector('.zaned-hero__artworks').style.transform !== pose, pose, { timeout: 5000 });
    console.log(`PASS: Camera movement resumes after transition ${trial}`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.waitForSelector('.zaned-hero');
  assert.equal(await page.locator('.brand-intro').count(), 0);
  assert(await page.locator(selectors).evaluateAll(nodes => nodes.every(node => !node.style.transform && !node.style.willChange)));
  console.log('PASS: Initial reduced motion bypasses the intro and preserves the static camera');
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  console.log('PASS: No browser errors or HTTP failures, including automatic favicon requests');
} finally {
  await browser.close();
}
