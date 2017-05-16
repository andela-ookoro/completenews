import React from 'react';
import Renderer from 'react-test-renderer';
import Headlines from '../../pages/Headlines';
import Visit from '../../helpers/visit';


// localStorage.setItem('sources', JSON.stringify(sources));
// localStorage.setItem('categories', JSON.stringify(['general', 'sport']));

let originalTimeout;
beforeEach(() => {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
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
      .select(NEWTODO_INPUT, 'abc-news-au')
      .wait('#articles-menu')
      .evaluate(() =>
        document.querySelector('#articles-menu').innerText,
      )
      .then((res) => {
        expect(res).toMatch('Abc News Au');
        done();
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
