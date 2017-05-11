import React from 'react';
import { mount } from 'enzyme';
import Renderer from 'react-test-renderer';
import SourceOptions from 'SourceOptions';

test('Component render a button', () => {
  const source = {
    id: 'BBC',
    name: 'BBC News',
    description: 'BBC world news',
  };
  const onClick = jest.fn();
  const component = Renderer.create(
    <SourceOptions
      key={source.id} name={source.name} title={source.description}
      id={source.id} fetchAvailableSort={onClick}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Value of render button should be same as props', () => {
  const source = {
    id: 'BBC',
    name: 'BBC News',
    description: 'BBC world news',
  };
  const onClick = jest.fn();
  const component = mount(
    <SourceOptions
      key={source.id} name={source.name} title={source.description}
      id={source.id} fetchAvailableSort={onClick}
    />,
  );
  const link = component.find('a');
  expect(link.text()).toEqual(source.name);
});

test('Link onclick should execute the function in the prop', () => {
  const source = {
    id: 'BBC',
    name: 'BBC News',
    description: 'BBC world news',
  };
  const onClick = jest.fn();
  const component = mount(
    <SourceOptions
      key={source.id} name={source.name} title={source.description}
      id={source.id} fetchAvailableSort={onClick}
    />,
  );
  const link = component.find('a');
  link.simulate('click');
  expect(onClick).toBeCalled();
});
