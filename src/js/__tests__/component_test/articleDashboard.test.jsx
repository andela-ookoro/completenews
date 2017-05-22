import React from 'react';
import { mount, shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import HeadlineDashboard from '../../pages/Headlines';

describe('rendering', () => {
  it('should a have function to convert string to toTitleCase', () => {
    const dashboard = new HeadlineDashboard();
    const toTitleCase = dashboard.toTitleCase('hello-world');
    expect(toTitleCase).toBe('Hello World');
  });

  const component = shallow(<HeadlineDashboard />);
  
  const sources = [
    {
      "id":"abc-news-au",
      "name":"ABC News (AU)",
      "description":"Australia's most trusted source of local",
      "url":"http://www.abc.net.au/news",
      "category":"general",
      "language":"en",
      "country":"au",
      "urlsToLogos":{"small":"","medium":"","large":""},
      "sortBysAvailable":["top"]
    },
   {
     "id":"al-jazeera-english",
     "name":"Al Jazeera English",
     "description":"News, analysis from the Middle East and worldwide.",
     "url":"http://www.aljazeera.com",
     "category":"general",
     "language":"en",
     "country":"us",
     "urlsToLogos":{"small":"","medium":"","large":""},
     "sortBysAvailable":["top","latest"]
    }
  ];
  const articles = [
    {
      "author":"Abhimanyu Ghoshal",
      "description":"After a failed effort to offer free internet acces.",
      "publishedAt":"2017-05-04T13:18:36Z",
      "scrapeDetails":"After a failed effort Facebook  ",
      "title":"Facebook launches Express Wi-Fi in India to bre",
      "url":"https://thenextweb.com/facebook/2017/05/04/" +
        "facebook-launches-express-wi-fi-in-india-to-bring-rural-areas-online/",
      "urlToImage":"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/" + 
        "2017/05/Facebook-Express-Wi-Fi.jpg"
     }
  ];
  const sourceGroup = {
    "general":[
      {
        "id":"abc-news-au",
        "name":"ABC News (AU)",
        "description":"Australia's most trusted more.",
        "url":"http://www.abc.net.au/news",
        "category":"general",
        "language":"en",
        "country":"au",
        "urlsToLogos":{"small":"","medium":"","large":""},
        "sortBysAvailable":["top"]
     }
     ],
     "technology":[
       {
         "id":"ars-technica",
         "name":"Ars Technica",
         "description":"The PC enthusiast's resource.",
         "url":"http://arstechnica.com",
         "category":"technology",
         "language":"en",
         "country":"us",
         "urlsToLogos":{"small":"","medium":"","large":""},
         "sortBysAvailable":["top","latest"]
        }
     ],
     "sport":[
       {
         "id":"bbc-sport",
         "name":"BBC Sport",
         "description":"The home of BBC Sport online.",
         "url":"http://www.bbc.co.uk/sport",
         "category":"sport",
         "language":"en",
         "country":"gb",
         "urlsToLogos":{"small":"","medium":"","large":""},
         "sortBysAvailable":["top"]
        }
     ],
     "business":[
       {
         "id":"bloomberg",
         "name":"Bloomberg",
         "description":"Bloomberg delivers business and markets news.",
         "url":"http://www.bloomberg.com",
         "category":"business",
         "language":"en",
         "country":"us",
         "urlsToLogos":{"small":"","medium":"","large":""},
         "sortBysAvailable":["top"]
        }
     ],
};
  const categories = [
    "general","technology","sport","business"];
  const isAuth = true;
  localStorage.setItem('categories',sourceGroup)
  component.setState({ sources, articles, isAuth, categories });
  const sideNav = component.nodes[0].props.children[0];

  it('should render a side nav', () => {
    expect(sideNav.props.id).toBe('side-nav');
  });

  it('The side nav should have a heading "Sources" ', () => {
    const sideNavHeading = sideNav.props.children[0].props;
    expect(sideNavHeading.children).toBe(' Sources ');
  });
  console.log(component.nodes[0].props.children[0].props.children[3]);
});

