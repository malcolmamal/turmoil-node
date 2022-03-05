import puppeteer from 'puppeteer';

const pageWidth = 1800;
const pageHeight = 1012;

const initializeBrowserAndPage = async (headless) => {
  const browser = await puppeteer.launch({
    headless,
    defaultViewport: null,
    args: [
      '--lang=en',
      `--window-size=${pageWidth + 13},${pageHeight + 131}`,
    ],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: pageWidth, height: pageHeight });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  return [browser, page];
};

export default initializeBrowserAndPage;
