import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import HeadlineDashboard from '../../pages/Headlines';
import * as ArticlesAction from '../../action/headlineAction';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';

const userInfo = {
  name: 'celestine',
  imageUrl: 'test.jpg',
  email: 'okorocelestine@gmail.com'
};
const control = {
  preventDefault: jest.fn(),
  target: {
    value: 'top',
    getAttribute: jest.fn(() => 'abc-news-au')
  }
};
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
const articles = [
  {
    'author': 'Abhimanyu Ghoshal',
    'description': 'After a failed effort to offer free internet acces.',
    'publishedAt': '2017-05-04T13: 18: 36Z',
    'scrapeDetails': 'After a failed effort Facebook  ',
    'title': 'Facebook launches Express Wi-Fi in India to bre',
    'url': 'https: //thenextweb.com/facebook/2017/05/04/' +
      'facebook-launches-express-wi-fi-in-india-to-bring-rural-areas-online/',
    'urlToImage': 'https: //cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/' +
      '2017/05/Facebook-Express-Wi-Fi.jpg'
  }
];
const sourceGroup = JSON.stringify({
  'general': [
    {
      'id': 'abc-news-au',
      'name': 'ABC News (AU)',
      'description': 'Australias most trusted more.',
      'url': 'http: //www.abc.net.au/news',
      'category': 'general',
      'language': 'en',
      'country': 'au',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top']
    }
  ],
  'technology': [
    {
      'id': 'ars-technica',
      'name': 'Ars Technica',
      'description': 'The PC enthusiasts resource.',
      'url': 'http: //arstechnica.com',
      'category': 'technology',
      'language': 'en',
      'country': 'us',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top', 'latest']
    }
  ],
  'sport': [
    {
      'id': 'bbc-sport',
      'name': 'BBC Sport',
      'description': 'The home of BBC Sport online.',
      'url': 'http: //www.bbc.co.uk/sport',
      'category': 'sport',
      'language': 'en',
      'country': 'gb',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top']
    }
  ],
  'business': [
    {
      'id': 'bloomberg',
      'name': 'Bloomberg',
      'description': 'Bloomberg delivers business and markets news.',
      'url': 'http: //www.bloomberg.com',
      'category': 'business',
      'language': 'en',
      'country': 'us',
      'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
      'sortBysAvailable': ['top']
    }
  ],
});

const cat = ['general', 'businesss'];
ArticlesAction.getFavouriteArticles = jest.fn(email =>
    articles
);
describe('Article Dashboard', () => {
  describe('Testing rendered dom ', () => {
    const component = shallow(<HeadlineDashboard />);
    const categories = ['general', 'technology', 'sport', 'business'];
    const isAuth = true;
    const articleSource = 'bloomberg';
    const source = 'Bloomberg';
    localStorage.setItem('categories', sourceGroup);
    component.setState(
      { sources, articles, isAuth, categories, articleSource, source }
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


    const businessSources = JSON.parse(sourceGroup).business;
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
    const firstArticle = articlesContent[0].props;
    it('The Article panel should display articles from the current source',
    () => {
      expect(firstArticle.author).toBe(articles[0].author);
      expect(firstArticle.title).toBe(articles[0].title);
      expect(firstArticle.urlToImage).toBe(articles[0].urlToImage);
      expect(firstArticle.description).toBe(articles[0].description);
      expect(firstArticle.publishedAt).toBe(articles[0].publishedAt);
      expect(firstArticle.url).toBe(articles[0].url);
      expect(firstArticle.source).toBe(businessSources[0].name);
      expect(firstArticle.scrape).toBeInstanceOf(Function);
      expect(firstArticle.isAuth).toBe(isAuth);
    });
  });

  describe('Testing component fucntions', () => {
    const newArticleDashboard = new HeadlineDashboard();
    localStorage.setItem('userProfile', JSON.stringify(userInfo));
    localStorage.setItem('sources', JSON.stringify(sources));

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
          articles,
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
          articles,
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
          sources
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
        localStorage.setItem('cat', JSON.stringify(cat));
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
        newArticleDashboard.sourceClick(control);
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
        newArticleDashboard.sortClick(control);
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
