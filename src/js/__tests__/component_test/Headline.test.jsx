import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import Headlines from '../../pages/Headlines';
import Visit from '../../helpers/visit';

const sources = [
  {
    "id":"abc-news-au",
    "name":"ABC News (AU)",
    "description":"Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
    "url":"http://www.abc.net.au/news",
    "category":"general",
    "language":"en",
    "country":"au",
    "urlsToLogos":{"small":"","medium":"","large":""},
    "sortBysAvailable":["top"]
  },
  {
    "id":"al-jazeera-english",
    "name":"Al Jazeera English",
    "description":"News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
    "url":"http://www.aljazeera.com",
    "category":"general",
    "language":"en",
    "country":"us",
    "urlsToLogos":{"small":"","medium":"","large":""},
    "sortBysAvailable":["top","latest"]
  },
];
// localStorage.setItem('sources', JSON.stringify(sources));
// localStorage.setItem('categories', JSON.stringify(['general', 'sport']));

let originalTimeout;
beforeEach(() => {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
});

afterEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

describe('End to End test ', () => {
  it('Article menu should display name of source when user select a source', 
  (done) => {
    const NEWTODO_INPUT = '#sources';
    Visit('/')
    .refresh()
      .wait(NEWTODO_INPUT)
      // type a todo and press ENTER
      .select(NEWTODO_INPUT, 'abc-news-au')
      .wait('#articles-menu')
      .evaluate(() => {
        return document.querySelector('#articles-menu').innerText;
      })
      .then((res) => {
        console.log(res);
        expect(res).toMatch('Abc News Au');
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
    it('Article menu should display name of source', (done) => {
    const NEWTODO_INPUT = '#sources';
    Visit('/')
    .refresh()
      .wait(NEWTODO_INPUT)
      // type a todo and press ENTER
      .select(NEWTODO_INPUT, 'abc-news-au')
      .wait('#articles-menu')
      .evaluate(() => {
        return document.querySelector('#articles-menu').innerText;
      })
      .then((res) => {
        console.log(res);
        expect(res).toMatch('Abc News Au');
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

test('Component render the article template', () => {
  const component = Renderer.create(
    <Headlines />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
