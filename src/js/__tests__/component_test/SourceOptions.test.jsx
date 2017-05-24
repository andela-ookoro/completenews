import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; 
import sources from '../../pages/headlines/SourceOptions';

const source = {
  id: 'BBC',
  name: 'BBC News',
  description: 'BBC world news',
};
const onClick = jest.fn();

describe('rendering', () => {
  it('should render content as describe in the component', () => {
    const component = Renderer.create(
      <sources
        key={source.id} name={source.name} title={source.description}
        id={source.id} fetchAvailableSort={onClick}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(
    <sources
      key={source.id} name={source.name} title={source.description}
      id={source.id} fetchAvailableSort={onClick}
    />,
  );

  const link = component.find('a');
  const linkContent = link.root.node.props;
  it('should display a link with source name as text and source id as a value',
   () => {
     const linkText = linkContent.name;
     const linkValue = linkContent.id;
     expect(linkValue).toEqual(source.id);
     expect(linkText).toEqual(source.name);
   });

  it('Clicking the link should call a fuction passed as props', () => {
    linkContent.fetchAvailableSort();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

