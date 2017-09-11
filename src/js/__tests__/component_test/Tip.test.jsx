import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import Tip from '../../pages/headlines/WelcomeTip';

describe('rendering', () => {
  it('should render content as describe in the component', () => {
    const component = Renderer.create(
      <Tip />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<Tip />);
  it('should render a welcome text', () => {
    const WelcomeText = component.find('.tipHeading').text();
    expect(WelcomeText).toBe(' Welcome to Complete news');
  });

  const tipText = component.find('p');

  it('should display a text to login', () => {
    const loginTip = tipText.nodes[2].props.children;
    expect(loginTip).toBe('Login to store interesting articles to your dashboard');
  });

  it('should display an arrow pointing towards the sources panel', () => {
    const arrowToSource = tipText.nodes[5].props.children;
    expect(arrowToSource).toBe(' ← ');
  });
});
