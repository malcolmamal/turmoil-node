import puppeteer from 'puppeteer';

const pageWidth = 1800;
const pageHeight = 1012;

class Page {
  static async build(headless = true) {
    const browser = await puppeteer.launch({
      headless,
      defaultViewport: null,
      args: [
        '--lang=en',
        `--window-size=${pageWidth + 13},${pageHeight + 131}`,
        '--no-sandbox', // for travis
      ],
    });
    const page = await browser.newPage();

    await page.setViewport({ width: pageWidth, height: pageHeight });
    const localPage = new Page(page, browser);

    return new Proxy(localPage, {
      get: (target, property) => localPage[property] || browser[property] || page[property],
    });
  }

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
  }

  async login(user, password) {
    await this.page.focus('#email');
    await this.page.keyboard.type(user);

    await this.page.focus('#password');
    await this.page.keyboard.type(password);

    await this.page.click('button.button');

    await this.page.waitForNavigation({
      waitUntil: 'networkidle0',
    });
  }

  async logout() {
    await this.page.click('#logout');
  }

  async getInnerHTMLContent(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  async getTextContent(selector) {
    return this.page.$eval(selector, (el) => el.textContent);
  }

  async getContent(selector) {
    return this.page.$eval(selector, (el) => el);
  }
}

export default Page;
