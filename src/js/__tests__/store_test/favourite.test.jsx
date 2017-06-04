import FavouriteCount from '../../store/favouriteStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';

describe('auth store', () => {
  it('should have a default count of  0 ', () => {
    expect(FavouriteCount.count).toBe(0);
  });

  it('should listen to "GET_FAVOURITE_COUNT" event', () => {
    const favouriteCount = 3;

    Dispatcher.dispatch({
      Type: Constant.GET_FAVOURITE_COUNT,
      favouriteCount,
    });
    expect(FavouriteCount.count).toBe(3);
  });
});

