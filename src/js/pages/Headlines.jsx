import React from 'react';
// import ReactDOM from 'react-dom';
//  import Fs from 'fs';
//  import Request from 'request';
//  import Cheerio from 'cheerio';

// import SourceOptions from './headlines/SourceOptions';
import SortBY from './headlines/SortBy';
import Article from './Article';
// import Category from './headlines/Category';
import SourceOptions from './headlines/SourceOptions';
// import SelectSource from './headlines/selectSource';

// import NotifyAction from '../action/notifyAction';
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
      isAuth: false,
      isDb: false,
    };
    this.count = 0;
    this.fecthHealines = this.fecthHealines.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = this.toTitleCase.bind(this);
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
    this.sourceChange = this.sourceChange.bind(this);
    this.headlineChange = this.headlineChange.bind(this);
    this.dbheadlineChange = this.dbheadlineChange.bind(this);
    this.authChange = this.authChange.bind(this);
    // this.scrape = this.scrape.bind(this);
    HeadlineStore.on('dbchange', this.dbheadlineChange);
    HeadlineStore.on('change', this.headlineChange);

    HeadlineStore.on('error', () => (this.setState({ message: HeadlineStore.error })));
    // NotifyStore.on('change', this.notifyUser);
    AuthStore.on('change', () => {
      this.setState({ isAuth: AuthStore.isAuth });
      // console.log(AuthStore.isAuth);
    });

    Sources.on('change', this.sourceChange);
  }
  // this method runs before the component render it content
  componentWillMount() {
    localStorage.getItem('sources');
    this.getSources();
  }

  componentWillUnmount() {
    Sources.removeListener('change', this.getSources);
    Sources.removeListener('dbchange');
    NotifyStore.removeListener('change', this.notifyUser);
    AuthStore.removeListener('change');
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
    });
    // console.log("WENT TO DB");
  }

  headlineChange() {
    const headlines = HeadlineStore.headlines;
    const error = HeadlineStore.error;
    // console.log(headlines);
    localStorage.setItem('articles', JSON.stringify(headlines));
    this.setState({
      articles: headlines,
      message: error,
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
    this.setState({ sources, categories });
    localStorage.setItem('cat', JSON.stringify(categories));
    localStorage.setItem('categories', JSON.stringify(sourcescategories));
    localStorage.setItem('sources', JSON.stringify(sources));
    //  console.log('sources');
  }

  authChange() {
    this.setState({ isAuth: AuthStore.isAuth });
    // console.log('auth');
  }

  notifyUser(message) {
    this.setState({ message });
    // console.log('message');
  }

  toTitleCase(str) {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() +
                    txt.substr(1).toLowerCase());
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
    });
  }

  /**
  scrape() {
    const url = 'https://thenextweb.com/microsoft/2017/05/02/microsoft-bringing-mixed-reality-classroom-view-mixed-reality/';
    Request(url, (error, response, html) => {
    if (!error) {
      Fs.writeFile('output.html', html, (err) => {
              console.log('File successfully written! - Check your project
              directory for the output.json file');
      });
    }
  });
}
*/


  render() {
    console.log(this.state.isAuth);
    return (
      <div className="row">
        <div className="col s2">
          Sources
          <select name="sources" style={{ height: 10 + 'em'}} size="25" className={'browser-default'} onChange={this.fetchAvailableSort}>
            {this.state.sources.map((source) =>
              <option key={source.id} value={source.id} title={source.description} >
                {source.name}
              </option>,
            )}
          </select>
          <ul className="collapsible" data-collapsible="accordion">
            {this.state.categories.map((cat) =>
              <li key={cat}>
                <div className="collapsible-header"> {this.toTitleCase(cat)} </div>
                <div className="collapsible-body">
                  {JSON.parse(localStorage.getItem('categories'))[cat].map((source) =>
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
        <div className={'col s10'}>
          <div>
            {(this.state.message !== '' && this.state.articles.length === 0)
              ?
                <div className="progress">
                  <div className="indeterminate"></div>
                </div>
              :
                <h5> {this.state.message} </h5>
            }
          </div>
          <h5>
            {this.state.articleSource}
            {(this.state.currentSort === '') ? ' ' : ` ${this.toTitleCase(this.state.currentSort)}   ${this.state.articles.length}  Headlines `}
            {this.state.sortBy.map((sortBy, i) =>
              <SortBY
                key={i} data={sortBy} source={this.state.source}
                onClick={this.fecthHealines}
              />,
              )}
          </h5>
          { (this.state.message) ?
            <h3>{this.state.message}</h3>
            :
            this.state.articles.map((article, i) =>
              <Article
                key={i} id={i} author={article.author} title={article.title}
                urlToImage={article.urlToImage} description={article.description}
                publishedAt={article.publishedAt} url={article.url} source={this.state.source}
                isAuth={this.state.isAuth}
              />,
            )
          }
        </div>
      </div>
    );
  }
}

// const test = new Headlines();
// window.scrape = test.scrape();
export default Headlines;
