import NotifyAction from '../../action/notifyAction';
import NotifyStore from '../../store/NotifyStore';

describe('notify action', () => {
  describe(' should have a funtion \'getAuthStatus\'', () => {
    expect(NotifyAction).toBeInstanceOf(Function);

    it(' should dispatch parameter message passed', () => {
      const message = 'welcome, Cele';
      NotifyAction(message);
      expect(NotifyStore.message).toBe(message);
    });
  });
});



