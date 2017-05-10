import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';

export const getHeadlines = (source, sort = '') => {
  Api.getHeadlines(source, sort)
    .then((headlines) => {
      Dispatcher.dispatch({
        Type: 'GET-HEADLINES',
        headlines,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: 'GET-HEADLINES-ERROR',
        err,
      });
    });
};

export const getDbHeadlines = (user) => {
  Api.getDbHeadlines(user)
    .then((headlines) => {
      Dispatcher.dispatch({
        Type: 'GET-DBHEADLINES',
        headlines,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: 'GET-HEADLINES',
        err,
      });
    });
};

export const resetHeadlines = () => {
  Dispatcher.dispatch({
    Type: 'GET-HEADLINES',
    headlines: [],
  });
};
