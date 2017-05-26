import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import SortBy from '../../pages/headlines/SortBy';

const data = 'Top';
const onClick = jest.fn();
describe('rendering', () => {
  it('should render content as describe in the component', () => {
    const component = Renderer.create(
      <SortBy data={data} source={data} onClick={onClick} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(
    <SortBy data={data} source={data} onClick={onClick} />,
  );

  it('should render a button with the sort option as text' +
      '(such as Top articles)', () => {
    const button = component.find('button');
    expect(button.text()).toEqual(`${data} articles`);
  });

  it('Clicking the button should call a function passed as props', () => {
    const button = component.find('button');
    button.simulate('click');
    expect(onClick).toBeCalled();
  });
});

