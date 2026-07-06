const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('documentElement.scrollWidth:', scrollWidth, 'vs innerWidth:', await page.evaluate(() => window.innerWidth));

  const h1Box = await page.locator('h1').boundingBox();
  console.log('h1 boundingBox:', h1Box);

  const h1Styles = await page.locator('h1').evaluate(el => {
    const cs = getComputedStyle(el);
    return { width: cs.width, whiteSpace: cs.whiteSpace, fontSize: cs.fontSize, display: cs.display };
  });
  console.log('h1 computed:', h1Styles);

  const parentBox = await page.locator('h1').evaluate(el => {
    const p = el.parentElement;
    const cs = getComputedStyle(p);
    return { tag: p.tagName, className: p.className, width: cs.width };
  });
  console.log('h1 parent:', parentBox);

  const headerBtn = await page.locator('header a[href="#register"]').boundingBox();
  console.log('header button boundingBox:', headerBtn);
  const headerBtnStyles = await page.locator('header a[href="#register"]').evaluate(el => {
    const cs = getComputedStyle(el);
    return { display: cs.display, whiteSpace: cs.whiteSpace, width: cs.width };
  });
  console.log('header button computed:', headerBtnStyles);

  const headerRow = await page.locator('header > div').boundingBox();
  console.log('header row boundingBox:', headerRow);

  await browser.close();
})();
