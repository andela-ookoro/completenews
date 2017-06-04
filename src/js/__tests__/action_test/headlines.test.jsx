import * as HeadlineAction from '../../action/headlineAction';
import HeadlineStore from '../../store/HeadlineStore';
import NotifyStore from '../../store/NotifyStore';
import * as resourceFetch from '../../utilities/utilities';
import MockData from '../../__mocks__/mockData';

describe('articleDashBoard action', () => {
  const SetMessage = (() => {
    expect(NotifyStore.message).toBe(MockData.errorMessage);
  });

  describe(' should have a Function \'resetHeadlines\'', () => {
    expect(HeadlineAction.resetArticles).toBeInstanceOf(Function);

    it(' should reset headlines to an empty array', () => {
      HeadlineAction.resetArticles();
      const articles = HeadlineStore.articles;
      expect(articles).toHaveLength(0);
    });
  });

  describe('should have a function \'getArticles\' ', () => {
    expect(HeadlineAction.getArticles).toBeInstanceOf(Function);

    resourceFetch.getArticles = jest.fn((source, sort) =>
      new Promise((resolve, reject) => {
        if (sort === 'none') {
          reject(MockData.errorMessage);
        }
        resolve(MockData.articles);
      })
    );

    it('should return articles or error message from to an external function',
    () => {
      HeadlineAction.getArticles('bbc-news', 'top');

      const SetArticle = (() => {
        expect(HeadlineStore.articles).toBe(MockData.articles);
      });

      HeadlineStore.on('change', SetArticle);

      expect(resourceFetch.getArticles).toBeCalledWith('bbc-news', 'top');

      NotifyStore.on('change', SetMessage);
      HeadlineAction.getArticles('bbc-news', 'none');
      expect(resourceFetch.getArticles).toBeCalledWith('bbc-news', 'none');
    });
  });

  resourceFetch.getFavouriteArticles = jest.fn(email =>
    new Promise((resolve, reject) => {
      if (email === 'cele') {
        reject(MockData.errorMessage);
      }
      resolve(MockData.articles);
    })
  );

  describe('should have a function \'getFavouriteArticles\'', () => {
    expect(HeadlineAction.getFavouriteArticles).toBeInstanceOf(Function);

    it('should return user\'s favourite articles or error message ', () => {
      HeadlineAction.getFavouriteArticles('okorocelestine');
      const articles = HeadlineStore.articles;
      expect(articles).toHaveLength(1);

      expect(resourceFetch.getFavouriteArticles).toBeCalledWith('okorocelestine');

      NotifyStore.on('change', SetMessage);
      HeadlineAction.getFavouriteArticles('cele');
      expect(resourceFetch.getFavouriteArticles).toBeCalledWith('cele');
    });
  });
});
