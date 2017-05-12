import NotifyAction from '../../action/notifyAction';
import NotifyStore from '../../store/NotifyStore';


test('Check if action  has function \'getAuthStatus\'', () => {
  expect(NotifyAction).toBeInstanceOf(Function);
});

test('Action should dispatch parameter passed', () => {
  const message = 'welcome, Cele';
  NotifyAction(message);
  expect(NotifyStore.message).toBe(message);
});


