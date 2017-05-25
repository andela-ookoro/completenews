import React from 'react';
import { mount, shallow } from 'enzyme';
import SourceSelect from '../../pages/headlines/selectSource';
import Sources from '../../store/SourceStore';
import * as resourceFetch from '../../utilities/api';

const Mocksources = [
  {
    'id': 'abc-news-au',
    'name': 'ABC News (AU)',
    'description': 'Australias most trusted source of local',
    'url': 'http: //www.abc.net.au/news',
    'category': 'general',
    'language': 'en',
    'country': 'au',
    'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
    'sortBysAvailable': ['top']
  },
  {
    'id': 'al-jazeera-english',
    'name': 'Al Jazeera English',
    'description': 'News, analysis from the Middle East and worldwide.',
    'url': 'http: //www.aljazeera.com',
    'category': 'general',
    'language': 'en',
    'country': 'us',
    'urlsToLogos': { 'small': '', 'medium': '', 'large': '' },
    'sortBysAvailable': ['top', 'latest']
  }
];

resourceFetch.getSources = jest.fn(() =>
   new Promise((resolve, reject) => {
     resolve(Mocksources);
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
      expect(Sources.sources).toBe(Mocksources);
    });
    const SourceChanged = jest.fn();
    it('getSource calls \'source Action \' ' +
      'when sources are not available in localstorage ',
   () => {
     newSourceSelect.getSources();
     Sources.on('change', setSources);
   });

    localStorage.setItem('sources', JSON.stringify(Mocksources));
    it('Else, it sets the state variable \'sources\' ' +
      'to the value of the variable \'sources\'  in localstorage ',
   () => {
     newSourceSelect.getSources();
     Sources.on('change', SourceChanged);
     expect(SourceChanged).toHaveBeenCalledTimes(0);
   });
  });
});

