import React from 'react';
import ReactDOM from 'react-dom';
//import Fs from 'fs';
//import Request from 'request';
//import Cheerio from 'cheerio';
// import HealineStore from '../store/HeadlineStore';


class Headlines extends React.Component {
  constructor() {
    super();
    this.state = { source: '', sources: [], articles: [], articleSource: '', sortBy: [] };
    this.fecthHealines = this.fecthHealines.bind(this);
    // this.scrape = this.scrape.bind(this);
  }
  // this method runs before the component render it content
  componentWillMount() {
    this.getSources();
    // HealineStore.on("change", this.getSources);
    // console.log("count" ,HealineStore.listenerCount("change"));
  }

  componentWillUnmount() {
    // HealineStore.removeListener("change", this.getSources);
  }

  getSources() {
    if (!localStorage.sources) {
      return $.getJSON('https://newsapi.org/v1/sources?language=en')
       .then((response) => {
         this.setState({ sources: response.sources });
         localStorage.sources = [];
         localStorage.sources = JSON.stringify(response.sources);
         //console.log(this.state.sources);
         //console.log(localStorage.sources);
        });
    } 
    return this.setState({ sources: JSON.parse(localStorage.sources) });
  }

  toTitleCase(str)  {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  // get available sort parameter
  fetchAvailableSort() {
    const source = ReactDOM.findDOMNode(this.refs.sources).value;
    // fix source name
    let sourceName = this.toTitleCase(source.toString().replace(/-/g, ' ')),
      sources = JSON.parse(localStorage.sources),
      sourceNode = sources.filter(obj => obj.id == source);
    const apiURl = `https://newsapi.org/v1/articles?source=${source
            }&apiKey=213327409d384371851777e7c7f78dfe`;
    $.getJSON(apiURl)
      .then((response) => {
        this.setState({ source, sortBy: (sourceNode[0].sortBysAvailable.length > 1) ? sourceNode[0].sortBysAvailable : [], articleSource: sourceName, articles: response.articles });
      });

    // this.setState({ source:source, sortBy: sourceNode[0].sortBysAvailable, articleSource:sourceName});
  }

  // fetct headlines
  fecthHealines(e) {
    const sort = e.target.value;
    console.log(sort);
    const source = ReactDOM.findDOMNode(this.refs.sources).value;
    if (source) {
      const apiURl = `https://newsapi.org/v1/articles?source=${source
            }&sortBy=${sort
            }&apiKey=213327409d384371851777e7c7f78dfe`;
      $.getJSON(apiURl)
      .then((response) => {
            this.setState({ articles: response.articles });
          });
    }
  }

  scrape() {
    const url = 'https://thenextweb.com/microsoft/2017/05/02/microsoft-bringing-mixed-reality-classroom-view-mixed-reality/';
    Request(url, (error, response, html) => {
    if (!error) {
      Fs.writeFile('output.html', html, (err) => {
              console.log('File successfully written! - Check your project directory for the output.json file');
      });
    }
  });
  }


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
      <div class="row"> 
        <div class="col s2">
          Sources
          <select style={{'minHeight': '700px'}} class="browser-default" name="sources" size={"25"} ref="sources" onChange={this.fetchAvailableSort.bind(this)}>
                {this.state.sources.map((source, i) => <SourceOptions key={i} data={source} />)}
            </select>
        </div>
        <div class="col s6">
          <h6>
            {this.state.articleSource} 
            {this.state.sortBy.map((sortBY, i) => <SortBY key={i} data={sortBY} onClick={this.fecthHealines} />)}
              </h6>
              {this.state.articles.map((article, i) => <Article key={i} data={article} />)}
        </div>
    </div>
    );
  }
}

// class to display source
class SourceOptions extends React.Component {
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    );
  }
}

// class to display sortBy
class SortBY extends React.Component {
  render() {
      // console.log(this.props.onClick);
    return (
      <button value={this.props.data} onClick={this.props.onClick}> {this.props.data}            </button>

    );
  }
}

// class to show article
class Article extends React.Component {
  render() {
      const imgStyle = {
          width: '80%',
          height: '40%',
   };
    const paragraphstyle = {
      width: '80%',
    };
    return (
      <div className="col s12 m7 l12">
        <h6 className="header">
          <span className={paragraphstyle} >
            {this.props.data.author} : {this.props.data.title}
          </span>
        </h6>
        <div className="card horizontal">
          <div className="card-image">
            <img className={imgStyle} src={this.props.data.urlToImage} alt="No news image" />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p className={paragraphstyle}>{this.props.data.description}</p>
            </div>
            <div className="card-action">
              <span>Published on {this.props.data.publishedAt} </span>
              <a href={this.props.data.url} target="_blank">Read on site </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
const test = new Headlines();
// window.scrape = test.scrape();
export default Headlines;
