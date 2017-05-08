import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';

export const getHeadlines = (source, sort = '') => {
  Api.getHeadlines(source, sort, (error, headlines) => {
    if (error) {
      Dispatcher.dispatch({
        actionType: 'GET-HEADLINES-ERROR',
        headlines,
      });
    } else {
      Dispatcher.dispatch({
        actionType: 'GET-HEADLINES',
        headlines,
      });
    }
  });
};

export const getDbHeadlines = (user) => {
  Api.getDbHeadlines(user, (error, headlines) => {
    if (error) {
      Dispatcher.dispatch({
        actionType: 'GET-HEADLINES-ERROR',
        headlines,
      });
    } else {
      Dispatcher.dispatch({
        actionType: 'GET-DBHEADLINES',
        headlines,
      });
    }
  });
};

export const resetHeadlines = () => {
  Dispatcher.dispatch({
    actionType: 'RESET-HEADLINES',
    headlines: [],
  });
};
