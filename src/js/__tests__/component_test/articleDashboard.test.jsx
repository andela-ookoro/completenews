import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import HeadlineDashboard from '../../pages/Headlines';
import * as ArticlesAction from '../../action/articleAction';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';
import mockData from '../../__mocks__/mockData';

ArticlesAction.getFavouriteArticles = jest.fn((email) => {
  if (email) {
    return mockData.articles;
  }
});

describe('Article Dashboard', () => {
  describe('Testing rendered dom ', () => {
    const component = shallow(<HeadlineDashboard />);
    const categories = ['general', 'technology', 'sport', 'business'];
    const isAuth = true;
    const articleSource = 'bloomberg';
    const source = 'Bloomberg';
    localStorage.setItem('categories', mockData.sourceGroup);
    component.setState(
      {
        sources: mockData.sources,
        articles: mockData.articles,
        isAuth,
        categories,
        articleSource,
        source
      }
    );
    const sideNav = component.nodes[0].props.children[0];

    it('should render a side nav', () => {
      expect(sideNav.props.id).toBe('side-nav');
    });

    it('The side nav should have a heading "Sources" ', () => {
      const sideNavHeading = sideNav.props.children[0].props;
      expect(sideNavHeading.children).toBe(' Sources ');
    });

    const sourceCategoryMenu = sideNav.props.children[3].props;
    it('The side nav should have a collapsible list of source categories',
    () => {
      expect(sourceCategoryMenu.className).toBe('collapsible');
    });


    const sourceCategories = sourceCategoryMenu.children;
    it('The source Category Menu should display a category per line', () => {
      expect(sourceCategories[0].key).toBe('general');
      expect(sourceCategories[1].key).toBe('technology');
      expect(sourceCategories[2].key).toBe('sport');
      expect(sourceCategories[3].key).toBe('business');
    });

    const businessArtcicleSources = sourceCategories[3].props.children;
    it('Each source Category should display the categpry as it\'s header', () => {
      expect(businessArtcicleSources[0].props.children[1]).toBe('Business');
    });


    const businessSources = JSON.parse(mockData.sourceGroup).business;
    it('On click of each source category should display the sources in ' +
      'the category',
    () => {
      const firstSource = businessArtcicleSources[1].props.children[0];
      expect(firstSource.props.name).toBe(businessSources[0].name);
      expect(firstSource.props.title).toBe(businessSources[0].description);
      expect(firstSource.props.fetchAvailableSort).toBeInstanceOf(Function);
    });

    const articlesPanel = component.nodes[0].props.children[1].props;
    it('There should be an article panel beside the side nav', () => {
      expect(articlesPanel.id).toBe('articles');
      expect(articlesPanel.className).toBe('col s11 m11 l10');
    });

    const articleSubMenu = articlesPanel.children[0].props;
    it('The Article panel should have a Submenu that displays the ' +
      'current source',
    () => {
      expect(articleSubMenu.id).toBe('articles-menu');
      const header = articleSubMenu.children[1];
      expect(header.props.children[0]).toBe(businessSources[0].id);
    });
    const articlesContent = articlesPanel.children[2].props.children;
    const firstArticle = articlesContent[0].props.children[0].props;
    it('The Article panel should display articles from the current source',
    () => {
      const firtArticlepanel = mockData.articles[0];
      expect(firstArticle.author).toBe(firtArticlepanel.author);
      expect(firstArticle.title).toBe(firtArticlepanel.title);
      expect(firstArticle.urlToImage).toBe(firtArticlepanel.urlToImage);
      expect(firstArticle.description).toBe(firtArticlepanel.description);
      expect(firstArticle.publishedAt).toBe(firtArticlepanel.publishedAt);
      expect(firstArticle.url).toBe(firtArticlepanel.url);
      expect(firstArticle.source).toBe(businessSources[0].name);
      expect(firstArticle.scrape).toBeInstanceOf(Function);
      expect(firstArticle.isAuth).toBe(isAuth);
    });
  });

  describe('Testing component fucntions', () => {
    const newArticleDashboard = new HeadlineDashboard();
    localStorage.setItem('userProfile', JSON.stringify(mockData.userInfo));
    localStorage.setItem('sources', JSON.stringify(mockData.sources));

    it('should a have function to convert string to toTitleCase', () => {
      const dashboard = new HeadlineDashboard();
      const toTitleCase = dashboard.toTitleCase('hello-world');
      expect(toTitleCase).toBe('Hello World');
    });

    it('should have  a Function; \'viewFavourite\' that invokes ' +
        'the \'getFavouriteArticles\' function in  article action',
    () => {
      expect(newArticleDashboard.viewFavourite).toBeInstanceOf(Function);
      newArticleDashboard.viewFavourite();
      expect(ArticlesAction.getFavouriteArticles)
        .toBeCalledWith('okorocelestine');
    });

    describe('should have  a Function; \'getFavouriteArticles\' ',
    () => {
      expect(newArticleDashboard.getFavouriteArticles).toBeInstanceOf(Function);
      it('getFavouriteArticles is invoked when the \'ArticlesStore\' ' +
        'emits \'dbchange\' event',
      () => {
        Dispatcher.dispatch({
          Type: Constant.GET_FAVOURITE_ARTICLES,
          articles: mockData.articles
        });
        sinon.spy(HeadlineDashboard.prototype, 'getFavouriteArticles');
        expect(HeadlineDashboard.prototype.getFavouriteArticles.calledOnce)
        .toBeDefined();
      });
    });


    describe('should have  a Function; \'getArticles\' ',
    () => {
      expect(newArticleDashboard.getFavouriteArticles).toBeInstanceOf(Function);
      it('getArticles is invoked when the \'ArticlesStore\' ' +
        'emits \'change\' event',
      () => {
        Dispatcher.dispatch({
          Type: Constant.GET_ARTICLES,
          articles: mockData.articles,
          source: 'bloomberg'
        });
        sinon.spy(HeadlineDashboard.prototype, 'getArticles');
        expect(HeadlineDashboard.prototype.getArticles.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'setAuth\' ',
    () => {
      expect(newArticleDashboard.setAuth).toBeInstanceOf(Function);
      it('setAuth is invoked when the \'AuthStore\' ' +
        'emits \'change\' event',
      () => {
        Dispatcher.dispatch({
          Type: Constant.GET_AUTH_STATUS,
          isAuth: true
        });
        sinon.spy(HeadlineDashboard.prototype, 'setAuth');
        expect(HeadlineDashboard.prototype.setAuth.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'updateSource\' ',
    () => {
      expect(newArticleDashboard.setAuth).toBeInstanceOf(Function);
      it('updateSource is invoked when the \'SourcesStore\' ' +
        'emits \'change\' event',
      () => {
        Dispatcher.dispatch({
          Type: Constant.GET_SOURCES,
          sources: mockData.sources
        });
        sinon.spy(HeadlineDashboard.prototype, 'updateSource');
        expect(HeadlineDashboard.prototype.updateSource.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'getSources\' ',
    () => {
      expect(newArticleDashboard.getSources).toBeInstanceOf(Function);

      it('getSources is invoked on component willmount',
      () => {
        sinon.spy(HeadlineDashboard.prototype, 'getSources');
        localStorage.setItem('cat', JSON.stringify(mockData.cat));
        newArticleDashboard.getSources();
        expect(HeadlineDashboard.prototype.getSources.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'sourceClick\' ',
    () => {
      expect(newArticleDashboard.sourceClick).toBeInstanceOf(Function);

      it('sourceClick is invoked when a source control is selected,' +
        'which invokes the fetchAvailableSort method',
      () => {
        sinon.spy(HeadlineDashboard.prototype, 'fetchAvailableSort');
        newArticleDashboard.sourceClick(mockData.control);
        expect(HeadlineDashboard.prototype.fetchAvailableSort.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'sortClick\' ',
    () => {
      expect(newArticleDashboard.sortClick).toBeInstanceOf(Function);

      it('sourceClick is invoked when a source control is selected,' +
        'which invokes the fetchArticles method',
      () => {
        sinon.spy(HeadlineDashboard.prototype, 'fecthArticles');
        newArticleDashboard.sortClick(mockData.control);
        expect(HeadlineDashboard.prototype.fecthArticles.calledOnce)
        .toBeDefined();
      });
    });

    describe('should have  a Function; \'resetScrapeUrl\' ',
    () => {
      expect(newArticleDashboard.resetScrapeUrl).toBeInstanceOf(Function);

      it('resetScrapeUrl set the state \'ScrapeUrl\' to an empty stirng',
      () => {
        newArticleDashboard.resetScrapeUrl();
        const scrapeUrl = newArticleDashboard.state.scrapeUrl;
        expect(scrapeUrl).toBe('');
      });
    });
  });
});
