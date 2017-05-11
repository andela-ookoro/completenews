import AuthAction from '../../action/authAction';
import AuthStore from '../../store/authStore';
import NotifyStore from '../../store/NotifyStore';

const status = false;
test('Check if action  has function \'getAuthStatus\'', () => {
  expect(AuthAction).toBeInstanceOf(Function);
});

test('Action should dispatch parameter passed', () => {
  AuthAction(status);
  expect(AuthStore.isAuth).toBe(status);
});

test('Datatype of status should be "Boolean"', () => {
  AuthAction('ok');
  expect(NotifyStore.message).toBe('Invalid datatype');
});
