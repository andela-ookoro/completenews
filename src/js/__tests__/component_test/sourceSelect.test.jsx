import React from 'react';
import { mount } from 'enzyme';
import ReactSelectize from 'react-selectize';
import sourceSelect from '../../pages/headlines/selectSource';

describe('rendering', () => {
  const sources = [
    {
      'id': 'abc-news-au',
      'name': 'ABC News (AU)',
      'description': 'Australias most trusted source of local',
      'url': 'http: //www.abc.net.au/news',
      'category': 'general',
      'language': 'en',
      'country': 'au',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top']
    },
    {
      'id': 'al-jazeera-english',
      'name': 'Al Jazeera English',
      'description': 'News, analysis from the Middle East and worldwide.',
      'url': 'http: //www.aljazeera.com',
      'category': 'general',
      'language': 'en',
      'country': 'us',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top', 'latest']
    }
  ];

  expect(1).toBe(1);
  const component = mount(<sourceSelect />);
  localStorage.setItem('sources', sources);
  component.componentWillMount();
  component.setState({ sources });
  console.log(component);
  // const sideNav = component.nodes[0].props.children[0];

  // it('should render a side nav', () => {
  //   expect(sideNav.props.id).toBe('side-nav');
  // });

  // it('The side nav should have a heading "Sources" ', () => {
  //   const sideNavHeading = sideNav.props.children[0].props;
  //   expect(sideNavHeading.children).toBe(' Sources ');
  // });

  // const sourceCategoryMenu = sideNav.props.children[3].props;
  // it('The side nav should have a collapsible list of source categories',
  // () => {
  //   expect(sourceCategoryMenu.className).toBe('collapsible');
  // });


  // const sourceCategories = sourceCategoryMenu.children;
  // it('The source Category Menu should display a category per line', () => {
  //   expect(sourceCategories[0].key).toBe('general');
  //   expect(sourceCategories[1].key).toBe('technology');
  //   expect(sourceCategories[2].key).toBe('sport');
  //   expect(sourceCategories[3].key).toBe('business');
  // });

  // const businessArtcicleSources = sourceCategories[3].props.children;
  // it('Each source Category should display the categpry as it\'s header', () => {
  //   expect(businessArtcicleSources[0].props.children[1]).toBe('Business');
  // });


  // const businessSources = JSON.parse(sourceGroup).business;
  // it('On click of each source category should display the sources in ' +
  //    'the category',
  // () => {
  //   const firstSource = businessArtcicleSources[1].props.children[0];
  //   expect(firstSource.props.name).toBe(businessSources[0].name);
  //   expect(firstSource.props.title).toBe(businessSources[0].description);
  //   expect(firstSource.props.fetchAvailableSort).toBeInstanceOf(Function);
  // });

  // const articlesPanel = component.nodes[0].props.children[1].props;
  // it('There should be an article panel beside the side nav', () => {
  //   expect(articlesPanel.id).toBe('articles');
  //   expect(articlesPanel.className).toBe('col s11 m11 l10');
  // });

  // const articleSubMenu = articlesPanel.children[0].props;
  // it('The Article panel should have a Submenu that displays the ' +
  //   'current source',
  // () => {
  //   expect(articleSubMenu.id).toBe('articles-menu');
  //   const header = articleSubMenu.children[1];
  //   expect(header.props.children[0]).toBe(businessSources[0].id);
  // });

  // const articlesContent = articlesPanel.children[2].props.children;
  // const firstArticle = articlesContent[0].props;
  // it('The Article panel should display articles from the current source',
  //  () => {
  //    expect(firstArticle.author).toBe(articles[0].author);
  //    expect(firstArticle.title).toBe(articles[0].title);
  //    expect(firstArticle.urlToImage).toBe(articles[0].urlToImage);
  //    expect(firstArticle.description).toBe(articles[0].description);
  //    expect(firstArticle.publishedAt).toBe(articles[0].publishedAt);
  //    expect(firstArticle.url).toBe(articles[0].url);
  //    expect(firstArticle.source).toBe(businessSources[0].name);
  //    expect(firstArticle.scrape).toBeInstanceOf(Function);
  //    expect(firstArticle.isAuth).toBe(isAuth);
  //  });
});

