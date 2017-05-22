import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';
import * as Constant from '../constants';

/**
 * get sources from an api
 * @return {object} Return nothing.
*/
const getSources = () => {
  Api.getSources()
    .then((sources) => {
      Dispatcher.dispatch({
        Type: Constant.GET_SOURCES,
        sources,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GetNotify,
        message: err,
      });
    });
};

export default getSources;
