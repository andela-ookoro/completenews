import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import Article from 'Article';

test('Component render the article template', () => {
  const article = {
    author: 'celestine',
    title: 'My story',
    urlToImage: 'test.jpg',
    publishedAt: '24/12/24',
    isAuth: true,
    url: 'http://localhost',
  };
  const i = 1;
  const source = 'BBC';
  const isAuth1 = true;
  const component = Renderer.create(
    <Article
      key={i} id={i} author={article.author} title={article.title}
      urlToImage={article.urlToImage} description={article.description}
      publishedAt={article.publishedAt} url={article.url} source={source}
      isAuth={isAuth1}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Property of each control should be same with props variable passed',
  () => {
    const article = {
      author: 'celestine',
      title: 'My story',
      urlToImage: 'test.jpg',
      publishedAt: '24/12/24',
      url: 'http://localhost',
    };
    const i = 1;
    const source = 'BBC';
    const isAuth = true;
    const wrapper = mount(
      <Article
        key={i} id={i} author={article.author} title={article.title}
        urlToImage={article.urlToImage} description={article.description}
        publishedAt={article.publishedAt} url={article.url} source={source}
        isAuth={isAuth}
      />,
    );
    const heading = wrapper.find('h6');
    expect(heading.text()).toEqual(`${article.author}:   ${article.title}`);
    const img = wrapper.find('img').props('urlToImage');
    expect(img.src).toEqual(article.urlToImage);
    const sourceURl = wrapper.find('a').props('url');
    expect(sourceURl.href).toEqual(article.url);
    expect(sourceURl.children).toEqual(`Read on  ${source} `);
    expect(sourceURl.target).toEqual('_blank');
    const button = wrapper.find('button').props('className');
    const className = button.className;
    expect(!className.includes('disabled')).toEqual(true);
  // expect(wrapper.getDOMNode()).to.have.property('card-image');
  });

test('Add to favourite button should be disabled for anonymous users', () => {
  const article = {
    author: 'celestine',
    title: 'My story',
    urlToImage: 'test.jpg',
    publishedAt: '24/12/24',
    url: 'http://localhost',
  };
  const i = 1;
  const source = 'BBC';
  const isAuth = false;
  const wrapper = mount(
    <Article
      key={i} id={i} author={article.author} title={article.title}
      urlToImage={article.urlToImage} description={article.description}
      publishedAt={article.publishedAt} url={article.url} source={source}
      isAuth={isAuth}
    />,
  );
  const button = wrapper.find('button').props('className');
  const className = button.className;
  expect(className.includes('disabled')).toEqual(true);
});

