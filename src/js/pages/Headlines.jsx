import React from 'react';
// import Request from 'request';
// import Fs from 'fs';
import SortBY from './headlines/SortBy';
import Article from './Article';
import SourceOptions from './headlines/SourceOptions';
import NotifyStore from '../store/NotifyStore';
import SourceAction from '../action/sourceAction';
import Sources from '../store/SourceStore';
import * as HeadlineAction from '../action/headlineAction';
import HeadlineStore from '../store/HeadlineStore';
import AuthStore from '../store/authStore';


class Headlines extends React.Component {
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
      isAuth: (!JSON.parse(localStorage.getItem('cat')) === {}),
      isDb: false,
      scrapeUrl: '',
    };
    this.count = 0;
    this.fecthHealines = this.fecthHealines.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = (str =>
       str.replace(/-/g, ' ').replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      );
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
    this.sourceChange = this.sourceChange.bind(this);
    this.headlineChange = this.headlineChange.bind(this);
    this.dbheadlineChange = this.dbheadlineChange.bind(this);
    this.authChange = this.authChange.bind(this);
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
      // Request(url, (error, response, html) => {
      //   if (!error) {
      //     Fs.writeFile('output.html', html, (err) => {
      //       console.log(`File successfully written! - Check your project
      //             directory for the output.json file`);
      //     });
      //   }
      // });
    });
    this.viewFavourite = (() => {
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
                      .email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      HeadlineAction.getDbHeadlines(userEmail);
      this.setState({ scrapeUrl: '' });
    });
    this.resetScrapeUrl = this.resetScrapeUrl.bind(this);
  }
  // this method runs before the component render it content
  componentWillMount() {
    if (this.state.isAuth) {
      this.viewFavourite();
    }
    localStorage.getItem('sources');
    this.getSources();
    HeadlineStore.on('dbchange', this.dbheadlineChange);
    HeadlineStore.on('change', this.headlineChange);
    AuthStore.on('change', this.authChange);
    Sources.on('change', this.sourceChange);
    NotifyStore.on('change', this.notifyUser);
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    if (userinfo) {
      this.setState({ isAuth: true });
    }
  }

  componentWillUnmount() {
    HeadlineStore.removeListener('change', this.headlineChange);
    HeadlineStore.removeListener('dbchange', this.dbheadlineChange);
    Sources.removeListener('change', this.getSources);
    NotifyStore.removeListener('change', this.notifyUser);
    AuthStore.removeListener('change', this.authChange);
  }

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

  dbheadlineChange() {
    const headlines = HeadlineStore.headlines;
    const error = HeadlineStore.error;
    localStorage.setItem('articles', JSON.stringify(headlines));
    this.setState({
      articles: headlines,
      message: error,
      articleSource: 'Favourite Headlines',
      sortBy: [],
      currentSort: '',
      isAuth: false,
      scrapeUrl: '',
    });
  }

  headlineChange() {
    const headlines = HeadlineStore.headlines;
    const error = HeadlineStore.error;
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    localStorage.setItem('articles', JSON.stringify(headlines));
    this.setState({
      articles: headlines,
      message: error,
      isAuth: (userinfo !== {}),
      scrapeUrl: '',
    });
  }

  sourceChange() {
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

  authChange() {
    this.setState({ isAuth: AuthStore.isAuth });
    // console.log('auth');
  }

  notifyUser() {
    this.setState({ message: NotifyStore.message });
  }

  // get available sort parameter
  fetchAvailableSort(e) {
    e.preventDefault();
    let cursource = e.target.getAttribute('value');
    if (!cursource) {
      cursource = e.target.value;
    }
    // fix source name
    const sourceName = this.toTitleCase(cursource.toString());
    const sources = JSON.parse(localStorage.sources);
    const sourceNode = sources.filter(obj => obj.id === cursource);
    HeadlineAction.getHeadlines(cursource, '');
    this.setState({
      sources,
      source: cursource,
      articleSource: sourceName,
      sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
      sourceNode[0].sortBysAvailable : [],
      scrapeUrl: '',
    });
  }
   // fetct headlines
  fecthHealines(e) {
    e.preventDefault();
    const sort = e.target.value;
    const source = this.state.source;
    HeadlineAction.getHeadlines(source, sort);
    this.setState({
      currentSort: sort,
      scrapeUrl: '',
    });
  }

  resetScrapeUrl() {
    this.setState({ scrapeUrl: '' });
  }


  render() {
    return (
      <div className="row">
        <div className="col s2" id="side-nav">
          Sources
          <select
            name="sources" size="25" id="sources"
            className={'browser-default'} onChange={this.fetchAvailableSort}
          >
            {(this.state.sources.length < 1) ?
              ''
              :
            this.state.sources.map(source =>
              <option
                key={source.id} value={source.id} title={source.description}
              >
                {source.name}
              </option>,
            )}
          </select>
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
                      <SourceOptions
                        key={source.id} name={source.name} title={source.description}
                        id={source.id} fetchAvailableSort={this.fetchAvailableSort}
                      />,
                  )}
                </div>
              </li>,
            )}
          </ul>
        </div>
        <div className={'col s10'} id="articles">
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
                ${this.state.articles.length}  Headlines `
              }
              {this.state.sortBy.map((sortBy, i) =>
                <SortBY
                  key={i} data={sortBy} source={this.state.source}
                  onClick={this.fecthHealines}
                />,
                )}
            </h5>
          </div>
          <div id="articles">
            {(this.state.scrapeUrl) ?
              <div className="scapediv">
                <h6 className="header"> {this.state.scrapeTitle}
                  <button onClick={this.resetScrapeUrl}>
                     &larr; View more Headlines </button>
                </h6>
                <iframe src={this.state.scrapeUrl} />
              </div>
            :
              this.state.articles.map((article, i) =>
                <Article
                  key={i} id={i} author={article.author} title={article.title}
                  urlToImage={article.urlToImage} description={article.description}
                  publishedAt={article.publishedAt} url={article.url}
                  source={(article.source) ? article.source : this.state.source}
                  isAuth={this.state.isAuth} scrape={this.scrape}
                />,
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Headlines;
