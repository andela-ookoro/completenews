import * as HeadlineAction from '../../action/headlineAction';
import HeadlineStore from '../../store/HeadlineStore';
import NotifyStore from '../../store/NotifyStore';
import * as resourceFetch from '../../utilities/api';


test('Function-resetHeadlines should reset headlines to an empty array',
 () => {
   expect(HeadlineAction.resetArticles).toBeInstanceOf(Function);
   HeadlineAction.resetArticles();
   const articles = HeadlineStore.articles;
   expect(articles).toHaveLength(0);
 });

const Mockarticles = [
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
const errorMessage = 'Error occurred';
resourceFetch.getArticles = jest.fn((source, sort) =>
   new Promise((resolve, reject) => {
     if (sort === 'none') {
       reject(errorMessage);
     }
     resolve(Mockarticles);
   })
);


test('Function-getArticles should make a call to an external function that ' +
  'return articles or error message',
 () => {
   expect(HeadlineAction.getArticles).toBeInstanceOf(Function);
   HeadlineAction.getArticles('bbc-news', 'top');
   const SetArticle = (() => {
     expect(HeadlineStore.articles).toBe(Mockarticles);
   });
   HeadlineStore.on('change', SetArticle);
   expect(resourceFetch.getArticles).toBeCalledWith('bbc-news', 'top');
   const SetMessage = (() => {
     expect(NotifyStore.message).toBe(errorMessage);
   });
   NotifyStore.on('change', SetMessage);
   HeadlineAction.getArticles('bbc-news', 'none');
   expect(resourceFetch.getArticles).toBeCalledWith('bbc-news', 'none');
 });

resourceFetch.getFavouriteArticles = jest.fn(email =>
   new Promise((resolve, reject) => {
     if (email === 'cele') {
       reject(errorMessage);
     }
     resolve(Mockarticles);
   })
);
test('Function-getFavouriteArticles should make a call to an external function that ' +
  'return articles or error message',
 () => {
   expect(HeadlineAction.getFavouriteArticles).toBeInstanceOf(Function);
   HeadlineAction.getFavouriteArticles('okorocelestine');
   const articles = HeadlineStore.articles;
   expect(articles).toHaveLength(1);
   expect(resourceFetch.getFavouriteArticles).toBeCalledWith('okorocelestine');
   const SetMessage = (() => {
     expect(NotifyStore.message).toBe(errorMessage);
   });
   NotifyStore.on('change', SetMessage);
   HeadlineAction.getFavouriteArticles('cele');
   expect(resourceFetch.getFavouriteArticles).toBeCalledWith('cele');
 });


