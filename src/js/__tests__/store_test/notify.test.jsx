import NotifyStore from '../../store/NotifyStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';

describe('notify store', () => {
  const message = 'welcome, Cele';
  test('Message should be intiated with empty string', () => {
    expect(NotifyStore.message).toBe('');
  });

  it('should have a function \'updateMessage\' that update the isauth property',
  () => {
    expect(NotifyStore.setMessage).toBeInstanceOf(Function);
    NotifyStore.setMessage(message);
    expect(NotifyStore.message).toBe(message);
  });

  it('should listen to "GET-NOTIFY" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_NOTIFY,
      message,
    });

    expect(NotifyStore.message).toBe(message);
  });
});
