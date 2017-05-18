import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';
import * as Constant from '../constants';

export const getHeadlines = (source, sort = '') => {
  Api.getArticles(source, sort)
    .then((articles) => {
      Dispatcher.dispatch({
        Type: Constant.GET_ARTICLES,
        articles,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GET_NOTIFY,
        message: err,
      });
    });
};

export const getFavouriteArticles = (user) => {
  Api.getFavouriteArticles(user)
    .then((articles) => {
      Dispatcher.dispatch({
        Type: Constant.GET_FAVOURITE_ARTICLES,
        articles,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GET_NOTIFY,
        message: err,
      });
    });
};

export const resetHeadlines = () => {
  Dispatcher.dispatch({
    Type: Constant.GET_ARTICLES,
    articles: [],
  });
};
