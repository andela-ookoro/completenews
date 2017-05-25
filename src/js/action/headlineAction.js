import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/api';
import * as Constant from '../constants';

/**
 * get articles from the api and dispatch them
 *  @param {string} source - the source to of the articles
 * @param {string} sort - the sort parameter
 * @return {string } Return nothing.
*/
export const getArticles = (source, sort = '') => {
  Api.getArticles(source, sort)
    .then((articles) => {
      Dispatcher.dispatch({
        Type: Constant.GET_ARTICLES,
        articles,
        source,
      });
    })
    .catch((err) => {
      Dispatcher.dispatch({
        Type: Constant.GET_NOTIFY,
        message: err,
      });
    });
};

/**
 * get users favourite articles from the database  and dispatch them
 *  @param {string} userEmail - the user email
 * @return {string } Return nothing.
*/
export const getFavouriteArticles = (userEmail) => {
  Api.getFavouriteArticles(userEmail)
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

/**
 * reset the articles to an empty array
 * @return {string } Return nothing.
*/
export const resetArticles = () => {
  Dispatcher.dispatch({
    Type: Constant.GET_ARTICLES,
    articles: [],
  });
};
