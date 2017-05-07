import React from 'react';
import ReactDOM from 'react-dom';
//  import Fs from 'fs';
//  import Request from 'request';
//  import Cheerio from 'cheerio';

import SourceOptions from './headlines/SourceOptions';
import SortBY from './headlines/SortBy';
import Article from './headlines/Article';

import * as SourceAction from '../action/sourceAction';
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
      categories: {},
      displayCategories: '',
    };
    this.fecthHealines = this.fecthHealines.bind(this);
    this.getSources = this.getSources.bind(this);
    this.toTitleCase = this.toTitleCase.bind(this);
    this.fetchAvailableSort = this.fetchAvailableSort.bind(this);
    this.displayCategories = this.displayCategories.bind(this);
    // this.scrape = this.scrape.bind(this);
  }
  // this method runs before the component render it content
  componentWillMount() {
    localStorage.getItem('sources');
    this.getSources();
    console.log('count', Sources.listenerCount('change'));
  }

  componentWillUnmount() {
    Sources.removeListener('change', this.getSources);
  }

  getSources() {
    if (!localStorage.getItem('sources')) {
      SourceAction.getSources();
      Sources.on('change', () => {
        let sources = Sources.sources;
        let categories = {};
        sources.forEach((source) => {
          if (!categories.hasOwnProperty(source.category)) {
            categories[source.category] = [];
          }
          categories[source.category].push(source);
        });
        this.setState({ sources, categories });
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('sources', JSON.stringify(sources));
        this.displayCategories();
      });
    }
    this.setState(
      {
        sources: JSON.parse(localStorage.sources),
        categories: JSON.parse(localStorage.categories),
      });
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() +
                    txt.substr(1).toLowerCase());
  }

  // get available sort parameter
  fetchAvailableSort(e) {
    e.preventDefault();
    const cursource = e.target.getAttribute('value');
    // fix source name
    const sourceName = this.toTitleCase(cursource.toString().replace(/-/g, ' '));
    const sources = JSON.parse(localStorage.sources);
    const sourceNode = sources.filter(obj => obj.id === cursource);
    //////////////
    HeadlineAction.getHeadlines(cursource, '');
    HeadlineStore.on('change', () => {
      const headlines = HeadlineStore.headlines;
      // console.log(headlines);
      localStorage.setItem('articles', JSON.stringify(headlines));
      this.setState({
        sources,
        source: cursource.toString(),
        sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
        sourceNode[0].sortBysAvailable : [],
        articleSource: sourceName,
        articles: headlines,
      },
        //() => console.log(this.state.articleSource)
      );
    });
    /*
    const apiURl = `https://newsapi.org/v1/articles?source=${cursource
            }&apiKey=213327409d384371851777e7c7f78dfe`;
    $.getJSON(apiURl)
      .then((response) => {
        this.setState({
          sources,
          source: cursource.toString(),
          sortBy: (sourceNode[0].sortBysAvailable.length > 1) ?
          sourceNode[0].sortBysAvailable : [],
          articleSource: sourceName,
          articles: response.articles }, () => console.log(this.state.articleSource));
        localStorage.setItem('articles', JSON.stringify(response.articles));
        //  console.log(JSON.parse(localStorage.articles));
      });
    // console.log(this.state.articleSource);
    // this.setState({ source:source, sortBy: sourceNode[0].sortBysAvailable,
    //  articleSource:sourceName});
    **/
  }
   // fetct headlines
  fecthHealines(e) {
    e.preventDefault();
    const sort = e.target.value;
    const source = this.state.source;
    HeadlineAction.getHeadlines(source, sort);
    HeadlineStore.on('change', () => {
      const headlines = HeadlineStore.headlines;
      // console.log(headlines);
      localStorage.setItem('articles', JSON.stringify(headlines));
      this.setState({ articles: headlines, currentSort: sort });
    });
  }

  displayCategories() {
     /*
    let html = [];
      currentsource,
      currentCategeory;
    const categories = this.state.categories;
    html.push(<ul className="collapsible" data-collapsible="accordion">);
    Object.keys(categories).forEach((currCategeory) => {
      console.log('test' ,currCategeory)
      
      html.push(<li><div className="collapsible-header">{currentCategeory}</div>);
      html.push(<div className="collapsible-body">);
      categories[currentCategeory].forEach((currentsource) => {
        html.push(<div><a>{currentsource}</a></div>)
      });
      html.push(</div>);
      html.push(</li>)
    });
    html.push(</ul>);
  
    html.push(<ul className="collapsible" data-collapsible="accordion">);
    console.log(this.state.categories.general);
    Object.keys(this.state.categories).forEach((currCategeory,i) => {
        html.push(<li key={i}><div className="collapsible-header">{currCategeory}</div>)</li>,
        
     });
    html.push(</ul>);
    this.setState({ displayCategories: html });
    //  return html;
      */
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
    /*
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
    */
    return (
      <div className="row">
        <div className="col s2">
          Sources
             {this.state.displayCategories}
        </div>
        <div className={'col s7'}>
          <h5>
            {this.state.articleSource}
            {(this.state.currentSort === '') ? ' ' : ' ' + this.toTitleCase(this.state.currentSort) + ' ' + this.state.articles.length + ' Headlines  '}
            {this.state.sortBy.map((sortBy, i) =>
              <SortBY key={i} data={sortBy} source={this.state.source}
                onClick={this.fecthHealines}
              />,
              )}
          </h5>
          {this.state.articles.map((article, i) =>
            <Article key={i} id={i} author={article.author} title={article.title}
              urlToImage={article.urlToImage} description={article.description}
              publishedAt={article.publishedAt} url={article.url}
            />,
            )}
        </div>
        <div className={'col s3'}>
          Sources
            {this.state.sources.map((source) =>
              <SourceOptions key={source.id} name={source.name} title={source.description} 
                id={source.id} fetchAvailableSort={this.fetchAvailableSort} 
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
