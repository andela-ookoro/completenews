import React from 'react';
import ReactDOM from 'react-dom';
import Fs from 'fs';
import Request from 'request';
//  import Cheerio from 'cheerio';
//  import HealineStore from '../store/HeadlineStore';

class Headlines extends React.Component {
  constructor() {
    super();
    this.state = { source: '', sources: [], articles: [], articleSource: '', sortBy: [] };
    this.fecthHealines = this.fecthHealines.bind(this);
    this.scrape = this.scrape.bind(this);
  }
  //  this method runs before the component render it content
  componentWillMount() {
    this.getSources();
    //  HealineStore.on("change", this.getSources);
    //  console.log("count" ,HealineStore.listenerCount("change"));
  }

  componentWillUnmount() {
    //  HealineStore.removeListener("change", this.getSources);
  }

  getSources() {
    if (!localStorage.sources) {
      return $.getJSON('https://newsapi.org/v1/sources?language=en')
        .then((response) => {
          this.setState({ sources: response.sources });
          localStorage.sources = [];
          localStorage.sources = JSON.stringify(response.sources);
          console.log(this.state.sources);
          console.log(localStorage.sources);
        });
    } else {
      return this.setState({ sources: JSON.parse(localStorage.sources) });
    }
  }
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  //get available sort parameter
  fetchAvailableSort() {
    const source = ReactDOM.findDOMNode(this.refs.sources).value;
    // fix source name
    let sourceName = this.toTitleCase(source.toString().replace(/-/g, ' ')),
      sources = JSON.parse(localStorage.sources),
      sourceNode = sources.filter(function (obj) {
        return obj.id == source;
      });

    this.setState({ source: source, sortBy: sourceNode[0].sortBysAvailable, articleSource: sourceName });
  }

  //fetct headlines
  fecthHealines(e) {
    const sort = e.target.value;
    console.log(sort);
    const source = ReactDOM.findDOMNode(this.refs.sources).value;
    if (source) {
      let apiURl = "https://newsapi.org/v1/articles?source=" + source +
        "&sortBy=" + sort +
        "&apiKey=213327409d384371851777e7c7f78dfe";
      $.getJSON(apiURl)
        .then((response) => {
          this.setState({ articles: response.articles });
        });
    }
  }

  scrape() {
    const url = 'https://thenextweb.com/microsoft/2017/05/02/microsoft-bringing-mixed-reality-classroom-view-mixed-reality/';
    Request(url, function (error, response, html) {
      if (!error) {
        Fs.writeFile('output.html', html, function (err) {
          console.log('File successfully written! - Check your project directory for the output.json file');
        });
      }
    });
  }


  render() {
    var sourceStyle = {
      marginleft: "5px",
      float: "left"
    };
    var articleStyle = {
      marginleft: "5px",
      float: "right"
    };

    return (
      <div>
        <div style={sourceStyle}>
          <select name="sources" size="25" ref="sources" onChange={this.fetchAvailableSort.bind(this)}>
            {this.state.sources.map((source, i) => <SourceOptions key={i} data={source} />)}
          </select>
        </div>
        <div>
          <h6>
            {this.state.articleSource}
            {this.state.sortBy.map((sortBY, i) => <SortBY key={i} data={sortBY} onClick={this.fecthHealines} />)}
          </h6>
          <table>
            <tbody>
              {this.state.articles.map((article, i) => <Article key={i} data={article} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

//class to display source
class SourceOptions extends React.Component {
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    );
  }
}

//class to display sortBy
class SortBY extends React.Component {
  render() {
    //console.log(this.props.onClick);
    return (
      <button value={this.props.data} onClick={this.props.onClick}> {this.props.data}  </button>

    );
  }
}

//class to show article
class Article extends React.Component {
  render() {
    var imgStyle = {
      width: '20px',
      height: '20px'
    };
    return (
      <tr>
        <td>{this.props.data.author}</td>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.description}</td>
        <td><a href={this.props.data.url}>Read on site </a></td>
        <td><img src={this.props.data.urlToImage} alt="news image" style={imgStyle} target="_blank" /></td>
        <td> {this.props.data.publishedAt}</td>
      </tr>
    );
  }
}
let test = new Headlines();
window.scrape = test.scrape();
export default Headlines;
