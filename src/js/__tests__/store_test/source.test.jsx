import SourceStore from '../../store/SourceStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';


test('Source should be intiated with empty array', () => {
  const src = SourceStore.sources;
  expect(src).toHaveLength(0);
});

test('Function "getSources" that update the isauth property', () => {
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
  SourceStore.getSources(sources);
  expect(SourceStore.sources).toBe(sources);
});

test('Store should listen to "GET-NOTIFY" event', () => {
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

  Dispatcher.dispatch({
    Type: Constant.GetSources,
    sources,
  });
  expect(SourceStore.sources).toBe(sources);
});

