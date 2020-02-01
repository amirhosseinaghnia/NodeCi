const Page = require('./helpers/customPage');

let page;

beforeEach(async() => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async() => {
  await page.close();
})

test('the header has the correct text', async() => {
  const text = await page.getContentsOf('a.left.brand-logo');

  expect(text).toEqual('Blogster');
});

test('clicking login starts oath flow', async() => {
  await page.click('.right a');
  const url = page.url();

  expect(url).toMatch(new RegExp('accounts.google.com'));
});

test('when signed in, shows logout button', async() => {
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]', el => el.innerHTML);
  expect(text).toEqual('Logout');
});