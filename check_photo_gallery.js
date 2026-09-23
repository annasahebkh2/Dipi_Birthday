const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

  const galleryCount = await page.locator('.gallery-card').count();
  const firstCardVisible = await page.locator('.gallery-card').first().isVisible();
  const initialOpacity = await page.locator('.portrait-photo').evaluate((el) => getComputedStyle(el).opacity);

  await page.locator('.gallery-card').first().click();
  await page.waitForTimeout(600);

  const afterSrc = await page.locator('.portrait-photo').evaluate((el) => el.getAttribute('src'));
  const afterOpacity = await page.locator('.portrait-photo').evaluate((el) => getComputedStyle(el).opacity);

  console.log('galleryCount=' + galleryCount);
  console.log('firstCardVisible=' + firstCardVisible);
  console.log('initialOpacity=' + initialOpacity);
  console.log('afterSrc=' + afterSrc);
  console.log('afterOpacity=' + afterOpacity);

  await browser.close();
})();
