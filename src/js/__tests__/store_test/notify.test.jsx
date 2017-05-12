import NotifyStore from '../../store/NotifyStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';


test('Message should be intiated with empty string', () => {
  expect(NotifyStore.message).toBe('');
});

test('Function "updateMessage" that update the isauth property', () => {
  const text = 'welcome, Cele';
  expect(NotifyStore.updateMessage).toBeInstanceOf(Function);
  NotifyStore.updateMessage(text);
  expect(NotifyStore.message).toBe(text);
});

test('Store should listen to "GET-NOTIFY" event', () => {
  const message = 'welcome, Cele';
  Dispatcher.dispatch({
    Type: Constant.GetNotify,
    message,
  });
  expect(NotifyStore.message).toBe(message);
});

