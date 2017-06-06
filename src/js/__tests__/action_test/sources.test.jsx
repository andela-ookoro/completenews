import SourcesAction from '../../action/getSource';
import Sources from '../../store/SourceStore';
import * as resourceFetch from '../../utilities/utilities';
import MockData from '../../__mocks__/mockData';

// mocking the getsources function of the utilities class
resourceFetch.getSources = jest.fn(() =>
   new Promise((resolve, reject) => {
     resolve(MockData.sources);
     reject('Error occurred');
   })
);

describe('sources action', () => {
  it('Should return sources or error message returned by an external function',
  () => {
    expect(SourcesAction).toBeInstanceOf(Function);
    SourcesAction();
    let sources = [];

    const setSources = (() => {
      sources = Sources.sources;
      expect(sources).toHaveLength(2);
    });

    Sources.on('change', setSources);
    expect(resourceFetch.getSources).toBeCalledWith();
  });
});

