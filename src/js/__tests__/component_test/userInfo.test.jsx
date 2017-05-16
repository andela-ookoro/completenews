import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import UserInfo from '../../pages/userinfo';

test('Component render the article template', () => {
  const component = Renderer.create(<UserInfo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Property of each control should be same with props variable passed',
  () => {
    const wrapper = shallow(<UserInfo />);
    const heading = wrapper.find('#viewfavouritebt');
    expect(heading.text()).toEqual('Favourite Headlines');
  });

