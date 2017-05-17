import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import UserInfo from '../../pages/userinfo';
import authAction from '../../action/authAction';

test('Component render the article template', () => {
  const component = Renderer.create(<UserInfo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should render a link to login when user is anonymous',
  () => {
    const wrapper = shallow(<UserInfo />);
    const link = wrapper.node.props.to;
    const loginText = wrapper.node.props.children;
    expect(link).toEqual('/login');
    expect(loginText).toEqual('Click to login');
    // const UserInfo1 = {
    //   imageUrl: '/src/favicon',
    //   name: 'cele',
    // };
    // let component = new UserInfo();
    // component.render();
    // console.log(component);
    // component.componentWillMount();
    // authAction(true, UserInfo1);
    // console.log(component);
  });

