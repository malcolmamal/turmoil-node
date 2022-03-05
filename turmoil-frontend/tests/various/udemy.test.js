const initializeBrowserAndPage = require('../helpers/puppeteer-init');
const baseUrl = require('../helpers/consts');
const { loginAsUserWithPassword, logout } = require('../actions/login-action');

let browser;
let page;

beforeEach(async () => {
  [browser, page] = await initializeBrowserAndPage(false);
});

afterEach(async () => {
  await browser.close();
});

test('Check if login button exists', async () => {
  const text = await page.$eval('button.button', (el) => el.textContent);

  expect(text).toEqual('Login');
});

test('Testing the login action', async () => {
  await loginAsUserWithPassword(page, 'aaa@aaa.pl', 'nopass');

  const url = await page.url();
  expect(url).toEqual(`${baseUrl}/logged`);
});

test('Testing the logout action', async () => {
  await loginAsUserWithPassword(page, 'aaa@aaa.pl', 'nopass');

  const logoutText = await page.$eval('#logout', (el) => el.innerHTML);
  expect(logoutText).toEqual('Logout - (logged as aaa@aaa.pl)');

  const logoutElement = await page.$eval('#logout', (el) => el);
  expect(logoutElement).toBeUndefined();

  await logout(page);

  const url = await page.url();
  expect(url).toEqual(`${baseUrl}/login`);
});
