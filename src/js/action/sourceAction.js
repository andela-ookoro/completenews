import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';
import * as Constant from '../constants';

const getSources = () => {
  Api.getSources()
    .then((sources) => {
      Dispatcher.dispatch({
        Type: Constant.GetSources,
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
