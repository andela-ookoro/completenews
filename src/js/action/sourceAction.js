import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';

export const getSources = () => {
  Api.getSources((sources) => {
    Dispatcher.dispatch({
      actionType: 'GET-SOURCES',
      sources,
    });
  });
};
