import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * @FileOverview A class that listen to action dispatched for articles
 * and emit a change.
 * @Author okwudiri.okoro@gandela.com (Okoro Celestine)
 */
class Articles extends EventEmitter {
  /** Create a store for articles. */
  constructor() {
    super();
    this.setArticles = this.setArticles.bind(this);
    this.setError = this.setError.bind(this);
    this.articles = [];
    this.source = '';
    this.error = '';
  }

 /**
   * Set the sources .
   * @param {array} articles - The articles to be set
   * @param {string} source - The articles to be set
   * @return {array} The articles of the object.
  */
  setArticles(articles, source) {
    this.articles = articles;
    this.source = source;
    return this.articles;
  }

   /**
   * Set the sources .
   * @param {string} error - The message to be set
   * @return {string} The error of the object.
  */
  setError(error) {
    this.error = error;
    return this.error;
  }

  /**
   * Listen to action dispatched and react to action of type GET_ARTICLES
   * @param {object} action - The an action that was dispatched
   * @return {null} It return no value
  */
  handleActions(action) {
    switch (action.Type) {
      case Constant.GET_ARTICLES:
        this.setArticles(action.articles, action.source);
        this.emit('change');
        break;
      case Constant.GET_FAVOURITE_ARTICLES :
        this.setArticles(action.articles, '');
        this.emit('dbchange');
        break;
      default :
    }
  }
}
const articles = new Articles();
Dispatcher.register(articles.handleActions.bind(articles));
export default articles;
