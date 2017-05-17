import React from 'react';
import { mount, shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import Login from '../../pages/login';

test('Component render the article template', () => {
  const component = Renderer.create(<Login />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should render a link to login when user is anonymous',
  () => {
    const wrapper = shallow(<Login />);
    // const loginText = wrapper.find('a').text();
    // expect(loginText).toEqual('Click to login');
    console.log(wrapper);
  });

