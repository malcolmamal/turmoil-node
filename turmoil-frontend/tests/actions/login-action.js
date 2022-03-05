const loginAsUserWithPassword = async (page, user, password) => {
  await page.focus('#email');
  await page.keyboard.type(user);

  await page.focus('#password');
  await page.keyboard.type(password);

  await page.click('button.button');

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
};

const logout = async (page) => {
  await page.click('#logout');
};

module.exports = { loginAsUserWithPassword, logout };
