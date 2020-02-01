const Page = require('puppeteer/lib/Page');

const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

Page.prototype.login = async function () {
  const user = await userFactory();
  const {session, sig} = sessionFactory(user);

  await this.setCookie({name: 'session', value: session});
  await this.setCookie({name: 'session.sig', value: sig});
  await this.goto('localhost:3000');
  await this.waitFor('a[href="/auth/logout"]');
}