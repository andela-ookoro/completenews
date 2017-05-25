import FavouriteAction from '../../action/favourite';
import FavouriteStore from '../../store/favouriteStore';

test('Check if action  has function \'getAuthStatus\'', () => {
  expect(FavouriteAction).toBeInstanceOf(Function);
});

test('Action should dispatch parameter passed', () => {
  FavouriteAction();
  expect(FavouriteStore.count).toBe(1);
});

test('Datatype of status should be "Boolean"', () => {
  FavouriteAction(2);
  expect(FavouriteStore.count).toBe(3);
});
