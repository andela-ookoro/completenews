import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import UserInfo from '../../pages/userinfo';
import * as ArticlesAction from '../../action/articleAction';
import Mockdata from '../../__mocks__/mockData';

describe('userinfo component', () => {
  it('snapshot should be same as render content', () => {
    const component = Renderer.create(<UserInfo />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const wrapper1 = mount(<UserInfo />);

  it('Should have an initial state with; an empty userInfo object, ' +
    ' isAuth to be false and favourite count to be one',
    () => {
      const state = wrapper1.node.state;
      expect(state.UserInfo).toEqual({});
      expect(state.isAuth).toBe(false);
    });

  localStorage.setItem('userProfile', JSON.stringify(Mockdata.userInfo));
  localStorage.setItem('articles', JSON.stringify(Mockdata.articles));
  const wrapper2 = mount(<UserInfo />);
  const state1 = wrapper2.node.state;
  it('Should display the user image, name; a signout button ' +
    'and favourite button for authenticated user using data in local storage',
    () => {
      expect(state1.UserInfo).toEqual(Mockdata.userInfo);
      expect(state1.isAuth).toBe(true);
    });

  ArticlesAction.getFavouriteArticles = jest.fn(email =>
    `mock userinfo ${email}`
  );
  const newUserInfo = new UserInfo();
  it('should have a function \'viewFavourite\' that invokes ' +
    'the \'getFavouriteArticles\' function in  article action',
  () => {
    expect(newUserInfo.viewFavourite).toBeInstanceOf(Function);
    newUserInfo.viewFavourite('okorocelestine');
    expect(ArticlesAction.getFavouriteArticles).toBeCalledWith('okorocelestine');
  });

  it('should have a function; \'signout\' that resets the user\'s info' +
    ' on localstorage and the component state ',
  () => {
    expect(newUserInfo.signout).toBeInstanceOf(Function);
    newUserInfo.signout();
    const state = newUserInfo.state;
    expect(state.UserInfo).toEqual({});
    expect(state.isAuth).toBe(false);
    expect(state.favouriteCount).toBe(0);
  });
});
