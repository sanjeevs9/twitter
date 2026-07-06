const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const sizes = [
    { name: 'mobile-375', width: 375, height: 5300 },
    { name: 'tablet-768', width: 768, height: 4200 },
    { name: 'desktop-1440', width: 1440, height: 3800 },
  ];
  for (const s of sizes) {
    const page = await browser.newPage({ viewport: { width: s.width, height: 900 } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(s.name, 'scrollWidth vs innerWidth:', scrollWidth, s.width);
    await page.screenshot({ path: `/private/tmp/claude-501/-Users-sanjeev-projects-twitter/3ce22136-3f97-495e-861d-fd9646fc5513/scratchpad/pw-${s.name}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})();
