const mockData = {
  userInfo: {
    name: 'celestine',
    imageUrl: 'test.jpg',
    email: 'okorocelestine@gmail.com'
  },
  control: {
    preventDefault: jest.fn(),
    target: {
      value: 'top',
      getAttribute: jest.fn(() => 'abc-news-au')
    }
  },
  addArticleControl: {
    preventDefault: jest.fn(),
    target: {
      value: 'top',
      getAttribute: jest.fn(() => 0)
    }
  },
  sources: [
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
  ],
  articles: [
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
  ],
  sourceGroup: JSON.stringify({
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
  }),
  cat: ['general', 'businesss'],
  errorMessage: 'Error occurred',
};

export default mockData;

