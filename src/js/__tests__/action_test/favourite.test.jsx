import FavouriteAction from '../../action/favouriteAction';
import FavouriteStore from '../../store/favouriteStore';
import MockData from '../../__mocks__/mockData';

describe('favourite action', () => {
  describe('should have a function \'getAuthStatus\'', () => {
    expect(FavouriteAction).toBeInstanceOf(Function);
    localStorage.setItem('favouriteArticles', JSON.stringify(MockData.articles));

    it('should dispatch the count of the favourite articles in localstorage' +
      ' when invoke with no parameter'
    , () => {
      FavouriteAction();
      expect(FavouriteStore.count).toBe(0);
    });

    it('should dispatch the count of the favourite articles in localstorage' +
      ' when invoke with zero', () => {
      FavouriteAction(0);
      expect(FavouriteStore.count).toBe(0);
    });

    it('should dispatch parameter passed', () => {
      FavouriteAction(2);
      expect(FavouriteStore.count).toBe(2);
    });
  });
});
