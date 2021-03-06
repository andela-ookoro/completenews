import Dispatcher from '../dispatcher/Dispatcher';
import * as Api from '../utilities/utilities';
import * as Constant from '../constants';

/**
 * dispatch articles from the api
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
 * dispatch users favourite articles from the database
 *  @param {string} userEmail - the user email
 * @return {string } Return nothing.
*/
export const getFavouriteArticles = (userEmail) => {
  Api.getFavouriteArticles(userEmail)
    .then((articles) => {
      localStorage.setItem('favoutireArticles', JSON.stringify(articles));

      Dispatcher.dispatch({
        Type: Constant.GET_FAVOURITE_ARTICLES,
        articles,
      });
    })
    .catch((err) => {
      console.log(err);
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
    source: ''
  });
};
