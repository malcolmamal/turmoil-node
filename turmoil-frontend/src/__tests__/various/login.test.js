import initializeBrowserAndPage from '../helpers/puppeteer-init';
import baseUrl from '../helpers/consts';
import { loginAsUserWithPassword, logout } from '../actions/login-action';

let browser;
let page;

beforeEach(async () => {
  [browser, page] = await initializeBrowserAndPage(false);
});

afterEach(async () => {
  await browser.close();
});

it('should be possible to see the login button', async () => {
  const text = await page.$eval('button.button', (el) => el.textContent);

  expect(text).toEqual('Login');
});

it('should be possible to login', async () => {
  await loginAsUserWithPassword(page, 'aaa@aaa.pl', 'nopass');

  const url = await page.url();
  expect(url).toEqual(`${baseUrl}/logged`);
});

it('should be possible to use the logout action', async () => {
  await loginAsUserWithPassword(page, 'aaa@aaa.pl', 'nopass');

  const logoutText = await page.$eval('#logout', (el) => el.innerHTML);
  expect(logoutText).toEqual('Logout - (logged as aaa@aaa.pl)');

  const logoutElement = await page.$eval('#logout', (el) => el);
  expect(logoutElement).toBeUndefined();

  await logout(page);

  const url = await page.url();
  expect(url).toEqual(`${baseUrl}/login`);
});
