import React from 'react';
import ReactSelectize from 'react-selectize';
import SourceAction from '../../action/sourceAction';
import Sources from '../../store/SourceStore';
import * as ArticlesAction from '../../action/headlineAction';

/**
 * @FileOverview A class that renders Articles
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class SourceList extends React.Component {

  /** Create sources object  */
  constructor() {
    super();
    this.state = { sources: [] };

    /**
     * set the sources
     * @return {null} Return no value.
    */
    this.getSources = () => {
      if (!localStorage.getItem('sources')) {
        SourceAction();
      } else {
        this.setState(
          {
            sources: JSON.parse(localStorage.getItem('sources')),
            categories: JSON.parse(localStorage.getItem('cat')),
          });
      }
    };

     /**
       * update the sources
       * @return {null} Return no value.
      */
    this.updateSource = () => {
      const newSources = Sources.sources;
      const sourcescategories = {};
      const categories = [];
      newSources.forEach((source) => {
        if (!sourcescategories.hasOwnProperty(source.category)) {
          sourcescategories[source.category] = [];
          categories.push(source.category);
        }
        sourcescategories[source.category].push(source);
      });
      localStorage.setItem('cat', JSON.stringify(categories));
      localStorage.setItem('categories', JSON.stringify(sourcescategories));
      localStorage.setItem('sources', JSON.stringify(newSources));
      this.setState({ sources: newSources, categories });
    };
  }

  /**
   * called when the component is ready to render its content
   * @return {null} Return no value.
  */
  componentWillMount() {
    localStorage.getItem('sources');
    this.getSources();
    Sources.on('change', this.updateSource);
  }

  /**
   * called when the component  remove its content
   * @return {null} Return no value.
  */
  componentWillUnmount() {
    Sources.removeListener('change', this.updateSource);
  }

  /**
   * Render the component content
   * @return {null} Return no value.
  */
  render() {
    const SimpleSelect = ReactSelectize.SimpleSelect;
    return (
      <SimpleSelect
        id="sources"
        placeholder="Select a Article Source"
        onValueChange={(source) => {
          const cursource = source.value;
          ArticlesAction.getArticles(cursource, '');
        }}
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
      </SimpleSelect>
    );
  }
}
export default SourceList;
