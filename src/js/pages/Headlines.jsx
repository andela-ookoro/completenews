import React from 'react';
import SortBY from './headlines/SortBy';
import Article from './Article';
import SourceLink from './headlines/SourceOptions';
import SelectSources from './headlines/selectSource';
import NotifyStore from '../store/NotifyStore';
import SourceAction from '../action/sourceAction';
import Sources from '../store/SourceStore';
import * as ArticlesAction from '../action/headlineAction';
import ArticlesStore from '../store/HeadlineStore';
import AuthStore from '../store/authStore';
import Tip from './headlines/tip';

/**
 * @FileOverview A class that renders Articles
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class Articles extends React.Component {
  /** Create Articles object  */
  constructor() {
    super();
    this.state = {
      source: '',
      sort: '',
      sources: [],
      articles: [],
      articleSource: '',
      sortBy: [],
      currentSort: '',
      categories: [],
      message: '',
      isAuth: false,
      isDb: false,
      scrapeUrl: '',
    };
    this.count = 0;
    this.fecthArticles = this.fecthArticles.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = (str =>
       str.replace(/-/g, ' ').replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      );
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
    this.updateSource = this.updateSource.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.getFavouriteArticles = this.getFavouriteArticles.bind(this);
    this.setAuth = this.setAuth.bind(this);
    this.scrape = ((e) => {
      e.preventDefault();
      const index = e.target.value;
      const articles = JSON.parse(localStorage.articles);
      const article = articles[index];
      const scrapeUrl = article.url.toString();
      const scrapeTitle = article.title;
      if (scrapeUrl.includes('https')) {
        this.setState({
          scrapeUrl: '',
          message: 'Cannot view page; access blocked by source',
        });
      } else {
        this.setState({ message: '', scrapeUrl, scrapeTitle });
      }
    });
    this.viewFavourite = (() => {
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
                      .email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      ArticlesAction.getFavouriteArticles(userEmail);
      this.setState({ scrapeUrl: '' });
    });
    this.resetScrapeUrl = this.resetScrapeUrl.bind(this);
    this.onInput = this.onInput.bind(this);
  }

   /**
   * called when the component is ready to render its content
   * @return {null} Return no value.
  */
  componentWillMount() {
    localStorage.getItem('sources');
    this.getSources();
    ArticlesStore.on('dbchange', this.getFavouriteArticles);
    ArticlesStore.on('change', this.getArticles);
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    if (userinfo) {
      this.setState({ isAuth: true });
      this.viewFavourite();
    } else {
      this.setState({ articleSource: '', isAuth: false });
    }
    AuthStore.on('change', this.setAuth);
    Sources.on('change', this.updateSource);
    NotifyStore.on('change', this.notifyUser);
  }

  /**
   * called when the component  remove its content
   * @return {null} Return no value.
  */
  componentWillUnmount() {
    ArticlesStore.removeListener('change', this.getArticles);
    ArticlesStore.removeListener('dbchange', this.getFavouriteArticles);
    Sources.removeListener('change', this.updateSource);
    NotifyStore.removeListener('change', this.notifyUser);
    AuthStore.removeListener('change', this.setAuth);
  }

   /**
   * get the source select from the autocomplete text box
   * @return {null} Return no value.
  */
  onInput() {
    const val = document.getElementById('source1').value;
    const opts = document.getElementById('sourcesData').childNodes;
    let sourceName;
    for (let i = 0; i < opts.length; i += 1) {
      if (opts[i].value === val) {
        sourceName = opts[i].value;
        break;
      }
    }
    const results = this.state.sources.filter(item =>
     item.name === sourceName
    );
    if (results.length > 0) {
      this.fetchAvailableSort('tst', results[0].id);
    }
  }

  /**
   * set the sources
   * @return {null} Return no value.
  */
  getSources() {
    if (!localStorage.getItem('sources')) {
      SourceAction();
    } else {
      this.setState(
        {
          sources: JSON.parse(localStorage.getItem('sources')),
          categories: JSON.parse(localStorage.getItem('cat')),
        });
    }
  }

  /**
   * get the Favourite Articles
   * @return {null} Return no value.
  */
  getFavouriteArticles() {
    const articles = ArticlesStore.articles;
    const error = ArticlesStore.error;
    localStorage.setItem('articles', JSON.stringify(articles));
    this.setState({
      articles,
      message: error,
      articleSource: 'Favourite Articles',
      sortBy: [],
      currentSort: '',
      isDb: true,
      scrapeUrl: '',
    });
  }

  /**
   * get the source Articles
   * @return {null} Return no value.
  */
  getArticles() {
    const articles = ArticlesStore.articles;
    const source = ArticlesStore.source;
    const error = ArticlesStore.error;
    localStorage.setItem('articles', JSON.stringify(articles));
    // fix source name
    const sourceName = this.toTitleCase(source.toString());
    const sources = JSON.parse(localStorage.sources);
    const sourceNode = sources.filter(obj => obj.id === source);
    this.setState({
      articles,
      message: error,
      scrapeUrl: '',
      isDb: false,
      sources,
      source,
      articleSource: sourceName,
      sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
      sourceNode[0].sortBysAvailable : [],
    });
  }

  /**
   * set the isAuth value
   * @return {null} Return no value.
  */
  setAuth() {
    this.setState({ isAuth: AuthStore.isAuth });
  }

  /**
   * update the sources
   * @return {null} Return no value.
  */
  updateSource() {
    const sources = Sources.sources;
    const sourcescategories = {};
    const categories = [];
    sources.forEach((source) => {
      if (!sourcescategories.hasOwnProperty(source.category)) {
        sourcescategories[source.category] = [];
        categories.push(source.category);
      }
      sourcescategories[source.category].push(source);
    });
    localStorage.setItem('cat', JSON.stringify(categories));
    localStorage.setItem('categories', JSON.stringify(sourcescategories));
    localStorage.setItem('sources', JSON.stringify(sources));
    this.setState({ sources, categories });
  }

  /**
   * set the message value
   * @return {null} Return no value.
  */
  notifyUser() {
    this.setState({ message: NotifyStore.message });
  }

  /**
   * get the articles and avaliable sort parameters of a source
   * @param {object} e - The object that trigger the event
   * @param {object} source - An option param for the source name
   * @return {null} Return no value.
  */
  fetchAvailableSort(e) {
    let cursource, source;
    if (source) {
      cursource = source;
    } else {
      e.preventDefault();
      cursource = e.target.getAttribute('value');
      if (!cursource) {
        cursource = e.target.value;
      }
    }
    // fix source name
    const sourceName = this.toTitleCase(cursource.toString());
    const sources = JSON.parse(localStorage.sources);
    const sourceNode = sources.filter(obj => obj.id === cursource);
    ArticlesAction.getArticles(cursource, '');
    this.setState({
      sources,
      source: cursource,
      articleSource: sourceName,
      sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
      sourceNode[0].sortBysAvailable : [],
      scrapeUrl: '',
    });
  }

  /**
   * get the articles  of a source given it's sort parameter
   * @param {object} e The object that trigger the event
   * @return {null} Return no value.
  */
  fecthArticles(e) {
    e.preventDefault();
    const sort = e.target.value;
    const source = this.state.source;
    ArticlesAction.getArticles(source, sort);
    this.setState({
      currentSort: sort,
      scrapeUrl: '',
    });
  }

  /**
   * set the value of scrapeUrl to an empty string
   * @return {null} Return no value.
  */
  resetScrapeUrl() {
    this.setState({ scrapeUrl: '' });
  }

  /**
   * Render the component content
   * @return {null} Return no value.
  */
  render() {
    const showAddToFavouriteButton = (this.state.isAuth && !this.state.isDb);
    return (
      <div className="row">
        <div className="col s1 m1 l2" id="side-nav">
          <h5 className="categoryHeader"> Sources </h5>
          <br />
          <SelectSources />
          <ul className="collapsible" data-collapsible="accordion">
            {(this.state.categories.length < 1 || !this.state.categories) ?
              ''
              :
            this.state.categories.map(cat =>
              <li key={cat}>
                <div className="collapsible-header"> {this.toTitleCase(cat)}
                </div>
                <div className="collapsible-body">
                  {JSON.parse(localStorage.getItem('categories'))[cat].map(
                    source =>
                      <SourceLink
                        key={source.id} name={source.name}
                        title={source.description} id={source.id}
                        fetchAvailableSort={this.fetchAvailableSort}
                      />,
                  )}
                </div>
              </li>,
            )}
          </ul>
        </div>
        <div className="col s11 m11 l10" id="articles">
          <div id="articles-menu">
            <div >
              {(this.state.message === '' && this.state.articles.length < 1)
                ?
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
                :
                  <h5> {this.state.message} </h5>
              }
            </div>
            <h5 name={'source'}>
              {this.state.articleSource}
              {
                (this.state.currentSort === '') ?
                ' '
                :
                ` ${this.toTitleCase(this.state.currentSort)}   
                ${this.state.articles.length}  Articles `
              }
              {this.state.sortBy.map((sortBy, i) =>
                <SortBY
                  key={i} data={sortBy} source={this.state.source}
                  onClick={this.fecthArticles}
                />,
                )}
            </h5>
          </div>
          <br />
          <div className="col s12 m12 l12" id="articles">
            {(!this.state.scrapeUrl && this.state.articles.length === 0)
            ?
              <Tip />
            :
            (this.state.scrapeUrl) ?
              <div className="scapediv">
                <h6 className="header"> {this.state.scrapeTitle}
                  <button onClick={this.resetScrapeUrl}>
                     &larr; View more Articles </button>
                </h6>
                <iframe src={this.state.scrapeUrl} />
              </div>
            :
              this.state.articles.map((article, i) =>
                <Article
                  key={i} id={i} author={article.author} title={article.title}
                  urlToImage={article.urlToImage}
                  description={article.description}
                  publishedAt={article.publishedAt} url={article.url}
                  source={(article.source) ? article.source : this.state.source}
                  isAuth={showAddToFavouriteButton}
                  scrape={this.scrape}
                />,
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
