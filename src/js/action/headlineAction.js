import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';
import * as Constant from '../constants';

export const getHeadlines = (source, sort = '') => {
  Api.getHeadlines(source, sort)
    .then((headlines) => {
      Dispatcher.dispatch({
        Type: Constant.GetHeadlines,
        headlines,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GetNotify,
        message: err,
      });
    });
};

export const getDbHeadlines = (user) => {
  Api.getDbHeadlines(user)
    .then((headlines) => {
      Dispatcher.dispatch({
        Type: Constant.GetDBHeadlines,
        headlines,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GetNotify,
        message: err,
      });
    });
};

export const resetHeadlines = () => {
  Dispatcher.dispatch({
    Type: Constant.GetHeadlines,
    headlines: [],
  });
};
