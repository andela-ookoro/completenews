import React from 'react';
import ReactDOM from 'react-dom';
//  import Fs from 'fs';
//  import Request from 'request';
//  import Cheerio from 'cheerio';
//  import HealineStore from '../store/HeadlineStore.js';
import SourceOptions from './headlines/SourceOptions';
import SortBY from './headlines/SortBy';
import Article from './headlines/Article';


class Headlines extends React.Component {
  constructor() {
    super();
    this.state = { source: '', sources: [], articles: [], articleSource: '', sortBy: [], currentSort: '' };
    this.fecthHealines = this.fecthHealines.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = this.toTitleCase.bind(this);
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    // this.scrape = this.scrape.bind(this);
  }
  // this method runs before the component render it content
  componentWillMount() {
    this.getSources();
    localStorage.getItem('sources');
    // HealineStore.on("change", this.getSources);
    // console.log("count" ,HealineStore.listenerCount("change"));
  }

  componentWillUnmount() {
    // HealineStore.removeListener("change", this.getSources);
  }

  getSources() {
    if (!localStorage.getItem('sources')) {
      return $.getJSON('https://newsapi.org/v1/sources?language=en')
       .then((response) => {
         this.setState({ sources: response.sources });
         localStorage.setItem('sources', JSON.stringify(response.sources));
         // console.log(this.state.sources);
         // console.log(localStorage.sources);
       });
    }
    return this.setState({ sources: JSON.parse(localStorage.sources) });
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  // get available sort parameter
  fetchAvailableSort(e) {
    const source = e.target.value;
    // fix source name
    const sourceName = this.toTitleCase(source.toString().replace(/-/g, ' '));
    const sources = JSON.parse(localStorage.sources);
    const sourceNode = sources.filter(obj => obj.id === source);
    const apiURl = `https://newsapi.org/v1/articles?source=${source
            }&apiKey=213327409d384371851777e7c7f78dfe`;
    $.getJSON(apiURl)
      .then((response) => {
        this.setState({
          source: sources,
          sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
          sourceNode[0].sortBysAvailable : [],
          articleSource: sourceName,
          articles: response.articles });
        localStorage.setItem('articles', JSON.stringify(response.articles));
        console.log(JSON.parse(localStorage.articles));
      });

    // this.setState({ source:source, sortBy: sourceNode[0].sortBysAvailable,
    //  articleSource:sourceName});
  }

  // fetct headlines
  fecthHealines(e) {
    const sort = e.target.value;
    // console.log(sort);
    const source = ReactDOM.findDOMNode(this.refs.sources).value;
    if (source) {
      const apiURl = `https://newsapi.org/v1/articles?source=${source
            }&sortBy=${sort
            }&apiKey=213327409d384371851777e7c7f78dfe`;
      $.getJSON(apiURl)
      .then((response) => {
        localStorage.articles = [];
        localStorage.articles = JSON.stringify(response.articles);
        //  console.log(response.articles);
        this.setState({ articles: response.articles, currentSort: sort });
      });
    }
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
    const sourceStyle = {
      marginleft: '5px',
      float: 'left',
    };
    const articleStyle = {
      marginleft: '5px',
      float: 'right',
    };
    const clear = {
      clear: 'both',
    };

    return (
      <div className="row">
        <div className="col s2">
          Sources
          <select style={{ minHeight: '700px' }} className={'browser-default'} name={'sources'} size={'25'} ref={'sources'} onChange={this.fetchAvailableSort}>
            {this.state.sources.map((source, i) => <SourceOptions key={i} data={source} />)}
          </select>
        </div>
        <div className={'col s9'}>
          <h5>
            {this.state.articleSource}
            {(this.state.currentSort === '') ? '' : '\t' + this.state.currentSort + '\t' + this.state.articles.length + ' news '}
            {this.state.sortBy.map(
              (sortBY, i) => <SortBY key={i} data={sortBY} onClick={this.fecthHealines} />,
              )}
          </h5>
          {this.state.articles.map((article, i) => <Article key={i} id={i}
            author={article.author} title={article.title} urlToImage={article.urlToImage}
            description={article.description} publishedAt={article.publishedAt}
            url={article.url}
          />,
            )}
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
