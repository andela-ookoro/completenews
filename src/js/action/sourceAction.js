import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';

const getSources = () => {
  Api.getSources((sources) => {
    Dispatcher.dispatch({
      actionType: 'GET-SOURCES',
      sources,
    });
  });
};

export default getSources;
