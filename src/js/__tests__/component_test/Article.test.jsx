import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import mockData from '../../__mocks__/mockData';

const Article = require('../../pages/Article').default;

const source = 'bbc';
const i = 1;
const id = 0;
const onClick = jest.fn();
const scrape = jest.fn();
const article = mockData.articles[0];
/**
 * @param {object} props - the additional prop object to pass
 * @return {object} the component props
 */
function createTestProps(props) {
  return {
    author: article.author,
    title: article.title,
    urlToImage: article.urlToImage,
    url: article.url,
    publishedAt: article.publishedAt,
    description: article.description,
    i,
    id,
    source,
    onClick,
    scrape,
    ...props,
  };
}
describe('Article component', () => {
  describe('rendering dom', () => {
    it('should render content as describe in the component', () => {
      const props = createTestProps({ isAuth: true });
      const component = Renderer.create(
        <Article {...props} />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    const props = createTestProps({ isAuth: false });
    const wrapper = shallow(
      <Article {...props} />,
    );

    it('component should have a heading in the format <author>:<title>', () => {
      const heading = wrapper.find('.articleHeader').nodes[0].props.children;
      const author = heading[0].toString().trimRight();
      const headingText = `${author} ${heading[1]}`;
      expect(headingText).toEqual(`${article.author}: ${article.title}`);
    });

    it('should display the image of the article', () => {
      const img = wrapper.find('img').props('urlToImage');
      expect(img.src).toEqual(article.urlToImage);
    });

    it('should display the link to the article with caption "Read on <source>"',
      () => {
        const sourceURl = wrapper.find('a').props('url');
        expect(sourceURl.href).toEqual(article.url);
        expect(sourceURl.children).toEqual(`Read on  ${source} `);
        expect(sourceURl.target).toEqual('_blank');
      });

    it('should hide the "Add to favourite button" for anonymous user"', () => {
      const button = wrapper.find('#btnAddToFav');
      expect(button.nodes).toHaveLength(0);
    });
  });
});
