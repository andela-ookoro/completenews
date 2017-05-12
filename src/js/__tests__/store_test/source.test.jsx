import SourceStore from '../../store/SourceStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';


test('Source should be intiated with empty array', () => {
  expect(SourceStore.sources).toBe([]);
});

test('Function "updateMessage" that update the isauth property', () => {
  const sources = [
    {
      id: 'BBC',
      description: 'British news',
    },
    {
      id: 'Super sport',
      description: 'super sport new',
    },
  ];
  expect(SourceStore.getSources).toBeInstanceOf(Function);
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

