import AuthAction from '../../action/authAction';
import AuthStore from '../../store/authStore';
import NotifyStore from '../../store/NotifyStore';

const status = false;
const userinfo = {
  name: 'okoro',
  email: 'okoro@me.com',
};
test('Check if action  has function \'getAuthStatus\'', () => {
  expect(AuthAction).toBeInstanceOf(Function);
});

test('Action should dispatch parameter passed', () => {
  AuthAction(status, userinfo);
  expect(AuthStore.isAuth).toBe(status);
});

test('Datatype of status should be "Boolean"', () => {
  AuthAction('ok', userinfo);
  expect(NotifyStore.message).toBe('Invalid datatype');
});
