import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../pages/Layout';

describe('rendering', () => {
  const component = shallow(<Layout />);
  const layout = component.node.props.children;
  const header = layout[0].props;
  it('Layout should contain a header', () => {
    expect(header.id).toBe('header');
  });

  const nav = header.children;
  it('The header should be a navigation panel', () => {
    expect(nav.type).toBe('nav');
  });
  const navContent = nav.props.children.props.children;
  it('The navigation panel shoul contain the application title', () => {
    const appTitle = navContent[0].props;
    expect(appTitle.children).toBe('Complete News');
    expect(appTitle.className).toBe('brand-logo');
  });

  it('The navigation panel should have a menu for small screen', () => {
    const mobileMenu = navContent[1].props;
    expect(mobileMenu.className).toBe('button-collapse');
  });

  const userMenu = navContent[2].props;
  it('The navigation panel should have a userInfo component by the top right',
  () => {
    expect(userMenu.className).toBe('right hide-on-med-and-down');
    const userMenuContent = userMenu.children.props.children;
    const containsUserinfo = userMenuContent.type.toString()
      .includes('UserInfo');
    expect(containsUserinfo).toBe(true);
  });

  const footer = layout[2].props.children;
  it('Layout should contain a footer', () => {
    expect(footer.type).toBe('footer');
  });

  const footerContent = footer.props.children.props.children;
  it('The footer should contain a copy right text', () => {
    expect(footerContent[0]).toBe('© 2017 Complete news Ltd');
  });

  const feedbackMail = footerContent[1].props;
  it('The footer should have a link to send feedback mail', () => {
    expect(feedbackMail.href).toBe('mailto:okwudiri.okoro@andela.com?' +
      'Subject=User%20Feedback');
    expect(feedbackMail.target).toBe('_top');
    expect(feedbackMail.id).toBe('feedback-mail');
    expect(feedbackMail.children).toBe('Contact Developer');
  });
  console.log(layout[1]);
});

