import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import NotFound from '../../pages/404';

describe('rendering', () => {
  it('should render content as describe in the component', () => {
    const component = Renderer.create(
      <NotFound />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<NotFound />);
  it('should render an apology "sorry" ', () => {
    const WelcomeText = component.find('.blueBlock').text();
    expect(WelcomeText).toBe(' Sorry ');
  });

  const tipText = component.find('p');

  it('should display "page not found"', () => {
    const notFoundText = tipText.nodes[1].props.children;
    expect(notFoundText).toBe(' Page not Found ');
  });

  it('should display a direct to contact team if it is a development fault',
   () => {
     const arriveByMistakeText = tipText.nodes[2].props.children;
     expect(arriveByMistakeText)
        .toBe('If you think you have arrived here by our mistake');
   });

  it('should display a link to mail the development team', () => {
    const mailtext = tipText.nodes[3].props.children;
    const hasMailLink = mailtext[1].props.href.toString()
      .includes('mailto:okwudiri.okoro@andela.com?Subject=User%20Feedback');
    expect(hasMailLink).toBeTruthy();
  });
});
