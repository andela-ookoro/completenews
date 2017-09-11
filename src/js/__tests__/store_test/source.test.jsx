import SourceStore from '../../store/SourceStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';
import MockData from '../../__mocks__/mockData';

describe('source store', () => {
  it('should be intiated with empty array', () => {
    const src = SourceStore.sources;
    expect(src).toHaveLength(0);
  });

  it('should have a function \'getSources\' that update the isauth property',
  () => {
    expect(SourceStore.setSources).toBeInstanceOf(Function);
    SourceStore.setSources(MockData.sources);
    expect(SourceStore.sources).toBe(MockData.sources);
  });

  it('should listen to "GET-NOTIFY" event', () => {
    Dispatcher.dispatch({
      Type: Constant.GET_SOURCE,
      sources: MockData.sources,
    });

    expect(SourceStore.sources).toBe(MockData.sources);
  });
});

