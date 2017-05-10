import React from 'react';
import { mount, shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import SortBy from '../js/pages/headlines/SortBy';

test('Link changes the class when hovered', () => {
  const data = 'test';
  const funtest = () => {
			return 1;
   };
  const component = Renderer.create(
    <SortBy data={data} source={data} onClick={funtest} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Value of render button should be same as props', () => {

  const data = 'Top';
  const funtest = (e) => {
		 return e.target.value;
  };

  // Render a checkbox with label in the document
  const wrapper = shallow(
    <SortBy data={data} source={data} onClick={funtest} />
  );
  const button = wrapper.find('button');
  console.log()
  expect(button.value()).toBe('Top');
});