import React from 'react';
import ReactDOM from 'react-dom';
import HealineStore from '../store/HeadlineStore';


class Headlines extends React.Component {
	constructor() {
    super();
		this.state = {sources: [], articles: [],articleSource : ''};     
  }
   
  getSources() {
		return $.getJSON('https://newsapi.org/v1/sources?language=en')
      .then((response) => {
        this.setState({ sources: response.sources });
      });
	}

	//this method runs before the component render it content
   componentWillMount() {
   		this.getSources();
		//HealineStore.on("change", this.getSources);
		//console.log("count" ,HealineStore.listenerCount("change"));
   }
   
	componentWillUnmount() {
		//HealineStore.removeListener("change", this.getSources);
	}

	toTitleCase(str)
	{
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	//fetct headlines
	fecthHealines() {
		const source = ReactDOM.findDOMNode(this.refs.sources).value;
		// fix source name
		let sourceName = this.toTitleCase(source.toString().replace(/-/g,' '));
		if (source){
			let apiURl = "https://newsapi.org/v1/articles?source=" + 
										source +
										"&sortBy=latest&apiKey="
										+ "213327409d384371851777e7c7f78dfe";
			$.getJSON(apiURl)
			.then((response) => {
        this.setState({ articles: response.articles , articleSource:sourceName});
      });
		}
		//TodoActions.newTodo(text);
	}

	

	render() {
				var sourceStyle = {
				  marginleft: "5px",
				  float : "left"
				};
				var articleStyle = {
				  marginleft: "5px",
				  float : "right"
				};
      return (
      	<div>
         <div style={sourceStyle}>
					<select name="sources" size="25" ref="sources" onChange={this.fecthHealines.bind(this)}>
						{this.state.sources.map((source, i) => <SourceOptions key = {i} data = {source} />)}
					</select>
         </div>
         <div>
         <h2> {this.state.articleSource} </h2>
        		<table>
               <tbody>
         					{this.state.articles.map((article, i) => <Article key = {i} data = {article} />)}
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

//class to show article
class Article extends React.Component {
   render() {
   		var imgStyle = {
				  width :'20px',
				  height :'20px'
				};
      return (
				 <tr>
            <td>{this.props.data.author}</td>
            <td>{this.props.data.title}</td>
            <td>{this.props.data.description}</td>
            <td><a href ={this.props.data.url}>Read on site </a></td>
            <td><img src={this.props.data.urlToImage} alt="news image" style={imgStyle} target="_blank"/></td>
            <td> {this.props.data.publishedAt}</td>
         </tr>
			);
   }
}
export default Headlines;