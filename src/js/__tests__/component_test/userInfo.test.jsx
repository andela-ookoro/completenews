import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import UserInfo from '../../pages/userinfo';
import * as ArticlesAction from '../../action/headlineAction';

test('Component render the article template', () => {
  const component = Renderer.create(<UserInfo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// mock data
const wrapper1 = mount(<UserInfo />);
const userInfo = {
  name: 'celestine',
  imageUrl: 'test.jpg',
  email: 'okorocelestine@gmail.com'
};
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

test('Should have an initial state with; an empty userInfo object, ' +
  ' isAuth to be false and favourite count to be one',
  () => {
    const state = wrapper1.node.state;
    expect(state.UserInfo).toEqual({});
    expect(state.isAuth).toBe(false);
  });

localStorage.setItem('userProfile', JSON.stringify(userInfo));
localStorage.setItem('articles', JSON.stringify(articles));
const wrapper2 = mount(<UserInfo />);
const state1 = wrapper2.node.state;
test('Should display the user image, name; a signout button ' +
  'and favourite button for authenticated user using data in local storage',
  () => {
    expect(state1.UserInfo).toEqual(userInfo);
    expect(state1.isAuth).toBe(true);
  });

ArticlesAction.getFavouriteArticles = jest.fn(email =>
   `mock userinfo ${email}`
);
const newUserInfo = new UserInfo();
test('Component has a Function; \'viewFavourite\' that invokes ' +
  'the \'getFavouriteArticles\' function in  article action',
 () => {
   expect(newUserInfo.viewFavourite).toBeInstanceOf(Function);
   newUserInfo.viewFavourite('okorocelestine');
   expect(ArticlesAction.getFavouriteArticles).toBeCalledWith('okorocelestine');
 });

test('Component has a Function; \'signout\' that resets the user\'s info' +
  ' on localstorage and the component state ',
 () => {
   expect(newUserInfo.signout).toBeInstanceOf(Function);
   newUserInfo.signout();
   const state = newUserInfo.state;
   expect(state.UserInfo).toEqual({});
   expect(state.isAuth).toBe(false);
   expect(state.favouriteCount).toBe(0);
 });
