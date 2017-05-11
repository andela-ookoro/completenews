import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import SortBy from 'SortBy';

test('Component render a button', () => {
  const data = 'test';
  const onClick = jest.fn();
  const component = Renderer.create(
    <SortBy data={data} source={data} onClick={onClick} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Value of render button should be same as props', () => {
  const data = 'Top';
  const onClick = jest.fn();
  const component = Renderer.create(
    <SortBy data={data} source={data} onClick={onClick} />,
  );
  const wrapper = mount(
    <SortBy data={data} source={data} onClick={onClick} />,
  );
  const button = wrapper.find('button');
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(button.text()).toEqual(data);
});

test('Button onclick should execute the function in the prop', () => {
  const data = 'Top';
  const onClick = jest.fn();
  const wrapper = mount(
    <SortBy data={data} source={data} onClick={onClick} />,
  );
  const button = wrapper.find('button');
  button.simulate('click');
  expect(onClick).toBeCalled();
});
