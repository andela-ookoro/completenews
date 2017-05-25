import SourcesAction from '../../action/sourceAction';
import Sources from '../../store/SourceStore';
import * as resourceFetch from '../../utilities/api';

const Mocksources = [
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

resourceFetch.getSources = jest.fn(() =>
   new Promise((resolve, reject) => {
     resolve(Mocksources);
     reject('Error occurred');
   })
);


test('Should should make a call to an external function that ' +
  'return sources or error message',
 () => {
   expect(SourcesAction).toBeInstanceOf(Function);
   SourcesAction();
   let sources = [];
   const setSources = (() => {
     sources = Sources.sources;
     expect(sources).toHaveLength(2);
   });
   Sources.on('change', setSources);
   expect(resourceFetch.getSources).toBeCalledWith();
 });
