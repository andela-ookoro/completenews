import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import Article from '../../pages/Article';

const article = {
  author: 'celestine',
  title: 'My story',
  urlToImage: 'test.jpg',
  publishedAt: '24/12/24',
  isAuth: true,
  url: 'http://localhost',
  description: 'Tia is me',
};
const source = 'BBC';
const i = 1;
const onClick = jest.fn();
const scrape = jest.fn();

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
    source,
    onClick,
    scrape,
    ...props,
  };
}

describe('rendering', () => {
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

  it('component should have a heading in the format <author>:<title', () => {
    const heading = wrapper.find('.paragraphstyle').nodes[0].props.children;
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

  const Identifiedprops = createTestProps({ isAuth: true });
  const IdentifiedWrapper = shallow(
    <Article {...Identifiedprops} />,
  );

  it('should show the "Add to favourite button" for identified user"', () => {
    const button = IdentifiedWrapper.find('#btnAddToFav').props('isAuth');
    expect(button).toBeTruthy();
  });
});
