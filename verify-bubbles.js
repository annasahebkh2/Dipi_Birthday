const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

  const bubbles = page.locator('.memory-bubble');
  const count = await bubbles.count();
  const first = bubbles.first();
  const before = await first.evaluate((el) => getComputedStyle(el).transform);

  console.log(`bubbleCount=${count}`);
  console.log(`beforeTransform=${before}`);

  await first.click({ force: true });
  await page.waitForTimeout(700);

  const after = await first.evaluate((el) => getComputedStyle(el).transform);
  const revealVisible = await page.locator('.memory-reveal').evaluate((el) => el.classList.contains('is-visible'));
  const portraitSrc = await page.locator('.portrait-photo').evaluate((el) => el.getAttribute('src'));

  console.log(`afterTransform=${after}`);
  console.log(`revealVisible=${revealVisible}`);
  console.log(`portraitSrc=${portraitSrc}`);

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
