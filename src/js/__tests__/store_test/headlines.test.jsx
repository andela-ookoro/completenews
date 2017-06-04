import HeadlineStore from '../../store/HeadlineStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';
import Mockdata from '../../__mocks__/mockData';

describe('articleDashboard store', () => {
  const source = 'Real word';

  it('should be intiated with empty values', () => {
    expect(HeadlineStore.articles).toHaveLength(0);
    expect(HeadlineStore.error).toBe('');
  });

  it('should have a function \'getHeadline\' that update the headlines property',
   () => {
     expect(HeadlineStore.setArticles).toBeInstanceOf(Function);
     HeadlineStore.setArticles(Mockdata.articles);
     expect(HeadlineStore.articles).toBe(Mockdata.articles);
   });

  it('should have a function \'displayError\' that update the "error" property',
   () => {
     expect(HeadlineStore.setError).toBeInstanceOf(Function);
     HeadlineStore.setError(Mockdata.errorMessage);
     expect(HeadlineStore.error).toBe(Mockdata.errorMessage);
   });

  it('should listen to "GetHeadline" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_ARTICLE,
      articles: Mockdata.articles,
      source
    });

    expect(HeadlineStore.articles).toEqual(Mockdata.articles);
  });

  it('should listen to "GetHeadlinesError" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_ARTICLES_ERROR,
      err: Mockdata.errorMessage,
    });

    expect(HeadlineStore.error).toBe(Mockdata.errorMessage);
  });
});
