import React from 'react';
// import ReactDOM from 'react-dom';
//  import Fs from 'fs';
//  import Request from 'request';
//  import Cheerio from 'cheerio';

// import SourceOptions from './headlines/SourceOptions';
import SortBY from './headlines/SortBy';
import Article from './Article';
import Category from './headlines/Category';
// import SelectSource from './headlines/selectSource';

import SourceAction from '../action/sourceAction';
import Sources from '../store/SourceStore';
import * as HeadlineAction from '../action/headlineAction';
import HeadlineStore from '../store/HeadlineStore';


class Headlines extends React.Component {
  constructor() {
    super();
    this.state = {
      source: '',
      sources: [],
      articles: [],
      articleSource: '',
      sortBy: [],
      currentSort: '',
      categories: [],
      errorMessage: '',
    };
    this.fecthHealines = this.fecthHealines.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = this.toTitleCase.bind(this);
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    // this.scrape = this.scrape.bind(this);
  }
  // this method runs before the component render it content
  componentWillMount() {
    localStorage.getItem('sources');
    this.getSources();
    HeadlineStore.on('change', () => {
      const headlines = HeadlineStore.headlines;
      const error = HeadlineStore.error;
      // console.log(headlines);
      localStorage.setItem('articles', JSON.stringify(headlines));
      this.setState({
        articles: headlines,
        errorMessage: error,
        articleSource: 'Favourite Headlines',
      });
    });
    // console.log('count', Sources.listenerCount('change'));
  }

  componentWillUnmount() {
    Sources.removeListener('change', this.getSources);
  }

  getSources() {
    if (!localStorage.getItem('sources')) {
      SourceAction();
      Sources.on('change', () => {
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
        // console.log('test', this.state.categories);
      });
    } else {
      this.setState(
        {
          sources: JSON.parse(localStorage.getItem('sources')),
          categories: JSON.parse(localStorage.getItem('cat')),
        });
    }
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
    HeadlineStore.on('change', () => {
      const headlines = HeadlineStore.headlines;
      const error = HeadlineStore.error;
      // console.log(headlines);
      localStorage.setItem('articles', JSON.stringify(headlines));
      this.setState({
        sources,
        source: sourceName,
        sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
        sourceNode[0].sortBysAvailable : [],
        articleSource: sourceName,
        articles: headlines,
        errorMessage: error,
      },
        //() => console.log(this.state.articleSource)
      );
    });
  }
   // fetct headlines
  fecthHealines(e) {
    e.preventDefault();
    const sort = e.target.value;
    const source = this.state.source;
    HeadlineAction(source, sort);
    HeadlineStore.on('change', () => {
      const headlines = HeadlineStore.headlines;
      const error = HeadlineStore.error;
      // console.log(headlines);
      localStorage.setItem('articles', JSON.stringify(headlines));
      this.setState({
        articles: headlines,
        currentSort: sort,
        errorMessage: error,
      });
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
              <Category
                key={cat} fetchAvailableSort={this.fetchAvailableSort}
                category={this.toTitleCase(cat)}
                sources={JSON.parse(localStorage.getItem('categories'))[cat]}
              />,
            )}
          </ul>
        </div>
        <div className={'col s10'}>
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
          { (this.state.errorMessage !== '') ?
            <h3>{this.state.errorMessage}</h3>
            :
            this.state.articles.map((article, i) =>
              <Article
                key={i} id={i} author={article.author} title={article.title}
                urlToImage={article.urlToImage} description={article.description}
                publishedAt={article.publishedAt} url={article.url} source={this.state.source}
              />,
            )
          }
        </div>
      
      </div>
    );
  }
}


// class to display source
/*
class SourceOptions extends React.Component {
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    );
  }
}
*/
// const test = new Headlines();
// window.scrape = test.scrape();
export default Headlines;
