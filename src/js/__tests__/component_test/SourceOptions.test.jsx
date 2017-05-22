import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; 
import * as Source from '../../pages/headlines/SourceOptions';

const sources = Source.SourceOptions;
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
    <Source.SourceOptions
      key={source.id} name={source.name} title={source.description}
      id={source.id} fetchAvailableSort={onClick}
    />,
  );

  it('should display a link with source name as text and source id as a value',
   () => {
     const link = component.find('a');
     const linkNode = link.root.node.props.children.props;
     const linkText = linkNode.children;
     const linkValue = linkNode.value;
     expect(linkValue).toEqual(source.id);
     expect(linkText).toEqual(source.name);
   });

  it('Clicking the link should call a fuction passed as props', () => {
    const link = component.nodes[0].props.children;
    link.props.onClick();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

