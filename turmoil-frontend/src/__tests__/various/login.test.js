import Page from '../helpers/puppeteer-init';
import baseUrl from '../helpers/consts';

let page;

beforeEach(async () => {
  page = await Page.build(true);
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });
});

afterEach(async () => {
  await page.close();
});

it('should be possible to see the login button', async () => {
  const text = await page.getTextContent('button.button');

  expect(text).toEqual('Login');
});

describe('when logged in', () => {
  beforeEach(async () => {
    await page.login('aaa@aaa.pl', 'nopass');
  });

  it('should be on the logged in page', async () => {
    const url = await page.url();
    expect(url).toEqual(`${baseUrl}/logged`);
  });

  it('should be possible to use the logout action', async () => {
    const logoutText = await page.getInnerHTMLContent('#logout');
    expect(logoutText).toEqual('Logout - (logged as aaa@aaa.pl)');

    const logoutElement = await page.getContent('#logout');
    expect(logoutElement).toBeUndefined();

    await page.logout();

    const url = await page.url();
    expect(url).toEqual(`${baseUrl}/login`);
  });
});
