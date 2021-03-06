import React from 'react';
import axios from 'axios';
import SortBY from './headlines/SortBy';
import Article from './Article';
import SourceLink from './headlines/SourceOptions';
import SelectSources from './headlines/SourceList';
import NotifyStore from '../store/NotifyStore';
import SourceAction from '../action/getSource';
import Sources from '../store/SourceStore';
import * as ArticlesAction from '../action/articleAction';
import ArticlesStore from '../store/ArticleStore';
import AuthStore from '../store/UserInfo';
import Tip from './headlines/WelcomeTip';
import * as Utilties from '../utilities/utilities';
/**
 * @FileOverview A class that renders Articles
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class ArticlesDashboard extends React.Component {
  /** Create Articles object
   * @param {object} props - The properties of the class
   * @param {object} context - The context which the class runs
   */
  constructor(props, context) {
    super(props, context);

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
      scrapeContent: '',
      scarpeImage: '',
      showloader: false
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

     /**
      * display the full content of the article
     * @param {object} e  - the control that fire the event
     * @return {null} Return no value.
    */
    this.scrape = ((e) => {
      e.preventDefault();
      const index = e.target.value;
      const articles = JSON.parse(localStorage.articles);
      const article = articles[index];
      const scrapeUrl = article.url.toString();
      const scrapeTitle = article.title;

      // use lateral api to the article's full content
      const url = `https://document-parser-api.lateral.io/?url=${scrapeUrl}
        &subscription-key=${process.env.LATERAL_READ_WRITE_KEY}`;

      axios.get(url, { 'content-type': 'application/json' })
        .then((response) => {
          document.getElementById('scrapeBody').innerHTML =
            Utilties.replaceLinks(response.data.body);
          this.setState({
            scrapeContent: response.data.body,
            scarpeImage: response.data.image
          });
        });

      this.setState({ message: '', scrapeUrl, scrapeTitle });
    });

    this.viewFavourite = (() => {
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
                      .email.toString().replace('.', '_');
      // get the user's email with the domain
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      ArticlesAction.getFavouriteArticles(userEmail);
      this.setState({ scrapeUrl: '' });
    });

    this.resetScrapeUrl = this.resetScrapeUrl.bind(this);
    this.sourceClick = this.sourceClick.bind(this);
    this.sortClick = this.sortClick.bind(this);
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

    // fetch the route sections
    const routeParams = this.props.routeParams;
    let sourceIDParam = '';
    let sortOptionParam = '';
    if (routeParams) {
      sourceIDParam = routeParams.sourceId;
      sortOptionParam = routeParams.sortOption;
    }

    const userinfo = JSON.parse(localStorage.getItem('userProfile'));

    // use the route section to call the appropriate function
    if (sortOptionParam) {
      this.fecthArticles(sourceIDParam, sortOptionParam);
    } else if (sourceIDParam) {
      this.fetchAvailableSort(sourceIDParam);
    } else if (userinfo) {
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

    // set the state properties to the favourite articles
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

    // change source name to title case
    const sourceName = this.toTitleCase(source.toString());
    const sources = JSON.parse(localStorage.getItem('sources'));
    const sourceNode = sources.filter(obj => obj.id === source);
    let showSortOption = (sourceNode[0]);

    if (showSortOption) {
      showSortOption = (!(sourceNode[0].sortBysAvailable.length < 2));
    }
    this.setState({
      articles,
      message: error,
      scrapeUrl: '',
      isDb: false,
      source,
      articleSource: sourceName,
      sortBy: (showSortOption) ? sourceNode[0].sortBysAvailable : [],
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

    // populate the object with the category and sources
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
   * @return {null} Return no value.
  */
  sourceClick(e) {
    let cursource = '';
    e.preventDefault();
    cursource = e.target.getAttribute('value');

    // check if the control was a link or a button
    if (!cursource) {
      cursource = e.target.value;
    }
    this.fetchAvailableSort(cursource);
  }

  /**
   * get the articles and avaliable sort parameters of a source
   * @param {object} source - An option param for the source name
   * @return {null} Return no value.
  */
  fetchAvailableSort(source) {
    // fix source name
    const sourceName = this.toTitleCase(source.toString());
    const sources = JSON.parse(localStorage.getItem('sources'));
    const sourceNode = sources.filter(obj => obj.id === source);

    ArticlesAction.getArticles(source, '');

    this.setState({
      sources,
      source,
      articleSource: sourceName,
      sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
      sourceNode[0].sortBysAvailable : [],
      scrapeUrl: '',
    });
  }

  /**
   * get the articles  of a source given it's sort parameter
   * @param {object} e The object that trigger the event
   *  @return {null} Return no value.
  */
  sortClick(e) {
    e.preventDefault();
    const Sort = e.target.value;
    const Source = this.state.source;
    this.fecthArticles(Source, Sort);
  }

  /**
   * get the articles  of a source given it's sort parameter
   * @param {string} source The source id which is optional
   * @param {string} sort The sort option which is optional
   * @return {null} Return no value.
  */
  fecthArticles(source, sort) {
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
          <h5 className="sourcesHeader"> Sources </h5>
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
                        fetchAvailableSort={this.sourceClick}
                      />,
                  )}
                </div>
              </li>,
            )}
          </ul>
        </div>
        <div className="col s11 m11 l10" id="articles">
          <div id="articles-menu">
            {(this.state.message === '' && this.state.articles.length < 1)
              ?
                ''
              :
                <div>
                  <h5> {this.state.message} </h5>
                </div>
            }
            <h5 name={'source'}>
              {this.state.articleSource}
              {
                (this.state.currentSort === '') ?
                ' '
                :
                ` , ${this.toTitleCase(this.state.currentSort)}   
                ${this.state.articles.length}  Articles `
              }
              {this.state.sortBy.map((sortBy, i) =>
                <SortBY
                  key={i} data={sortBy} source={this.state.source}
                  onClick={this.sortClick}
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

                <img
                  className="col s12 m10 l8 scrapeImage"
                  src={this.state.scarpeImage} alt="article image"
                />

                <div className="col s12 m10 l8 scrapeArticle" id="scrapeBody" />
              </div>
            :
              this.state.articles.map((article, i) =>
                <div>
                  <Article
                    key={i} id={i} author={article.author} title={article.title}
                    urlToImage={article.urlToImage}
                    description={article.description}
                    publishedAt={article.publishedAt} url={article.url}
                    source={(article.source) ? article.source : this.state.source}
                    isAuth={showAddToFavouriteButton}
                    scrape={this.scrape} firebaseKey={article.key}
                  />
                </div>,
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesDashboard;
