import FavouriteAction from '../../action/favourite';
import FavouriteStore from '../../store/favouriteStore';

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
localStorage.setItem('articles', JSON.stringify(articles));
test('Check if action  has function \'getAuthStatus\'', () => {
  expect(FavouriteAction).toBeInstanceOf(Function);
});

test('Action should dispatch parameter passed', () => {
  FavouriteAction();
  expect(FavouriteStore.count).toBe(1);
});

test('Datatype of status should be "Boolean"', () => {
  FavouriteAction(2);
  expect(FavouriteStore.count).toBe(2);
});
