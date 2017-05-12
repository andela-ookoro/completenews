import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import Headlines from 'Headlines';
const sources = [
  { 
    id: 'abc-news-au',
    name: 'ABC News (AU)',
    description: 'Australia/s most',
    url: 'http://www.abc.net.au/news',
    category: 'general',
    language: 'en',
    country: 'au',
    urlsToLogo: {
      small: '',
    },
    sortBysAvailable: ['top'],
  },
  {
    d: 'abc-news-au',
    name: 'ABC News (AU)',
    description: 'Australia/s most',
    url: 'http://www.abc.net.au/news',
    category: 'general',
    language: 'en',
    country: 'au',
    urlsToLogo: {
      small: '',
    },
    sortBysAvailable: ['top'],
  },
];
localStorage.setItem('sources', sources);
test('Component render the article template', () => {
  const component = Renderer.create(
    <Headlines />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
