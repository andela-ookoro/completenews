import ArticleStore from '../../store/ArticleStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';
import Mockdata from '../../__mocks__/mockData';

describe('articleDashboard store', () => {
  const source = 'Real word';

  it('should be intiated with empty values', () => {
    expect(ArticleStore.articles).toHaveLength(0);
    expect(ArticleStore.error).toBe('');
  });

  it('should have a function \'getHeadline\' that update the headlines property',
   () => {
     expect(ArticleStore.setArticles).toBeInstanceOf(Function);
     ArticleStore.setArticles(Mockdata.articles);
     expect(ArticleStore.articles).toBe(Mockdata.articles);
   });

  it('should have a function \'displayError\' that update the "error" property',
   () => {
     expect(ArticleStore.setError).toBeInstanceOf(Function);
     ArticleStore.setError(Mockdata.errorMessage);
     expect(ArticleStore.error).toBe(Mockdata.errorMessage);
   });

  it('should listen to "GetHeadline" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_ARTICLE,
      articles: Mockdata.articles,
      source
    });

    expect(ArticleStore.articles).toEqual(Mockdata.articles);
  });

  it('should listen to "GetHeadlinesError" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_ARTICLES_ERROR,
      err: Mockdata.errorMessage,
    });

    expect(ArticleStore.error).toBe(Mockdata.errorMessage);
  });
});
