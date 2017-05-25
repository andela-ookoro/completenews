import AuthStore from '../../store/authStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';


test('Default auth should have a value "false" ', () => {
  expect(AuthStore.isAuth).toBe(false);
});

test('Function "updateAuth" that update the isauth property', () => {
  const status = true;
  const userinfo = {
    name: 'okoro',
    email: 'okoro@me.com',
  };
  expect(AuthStore.updateUserInfo).toBeInstanceOf(Function);
  AuthStore.updateUserInfo(status, userinfo);
  expect(AuthStore.isAuth).toBe(status);
});

test('Store should listen to "GET-NOTIFY" event', () => {
  const status = true;
  Dispatcher.dispatch({
    Type: Constant.GET_AUTH_STATUS,
    status,
  });
  expect(AuthStore.isAuth).toBe(status);
});

