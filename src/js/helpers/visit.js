import Nightmare from 'nightmare';
import url from 'url';

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || 1142,
});

const browser = new Nightmare({
  show: true,
  typeInterval: 20,
  pollInterval: 500,
});

/**
 * Route to a given route
 * @param {string} path The relative path to visit
 * @return {object} Return a nigthmare object calling the goto function.
*/
export default function (path = '') {
  const location = url.resolve(BASE_URL, path);
  return browser.goto(location);
}
