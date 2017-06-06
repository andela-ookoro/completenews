import React from 'react';
import { mount } from 'enzyme';
import SourceSelect from '../../pages/headlines/SourceList';
import Sources from '../../store/SourceStore';
import * as resourceFetch from '../../utilities/utilities';
import MockData from '../../__mocks__/mockData';

resourceFetch.getSources = jest.fn(() =>
   new Promise((resolve, reject) => {
     resolve(MockData.sources);
     reject('Error occurred');
   })
);

describe('rendering', () => {
  const component = mount(<SourceSelect />);
  const newSourceSelect = new SourceSelect();
  it('Should have an initial state with sources as a empty array', () => {
    expect(component.node.props).toEqual({});
  });

  describe('Has a function \'getSource\'', () => {
    const setSources = (() => {
      expect(Sources.sources).toBe(MockData.sources);
    });
    const SourceChanged = jest.fn();
    it('getSource calls \'source Action \' ' +
      'when sources are not available in localstorage ',
   () => {
     newSourceSelect.getSources();
     Sources.on('change', setSources);
   });

    localStorage.setItem('sources', JSON.stringify(MockData.sources));
    it('Else, it sets the state variable \'sources\' ' +
      'to the value of the variable \'sources\'  in localstorage ',
   () => {
     newSourceSelect.getSources();
     Sources.on('change', SourceChanged);
     expect(SourceChanged).toHaveBeenCalledTimes(0);
   });
  });
});

