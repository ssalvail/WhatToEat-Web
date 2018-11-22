import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Content.css';

import SuggestForm from './SuggestForm';

const Index = () => {
  return <h1>Are You Looking for a Restaurant or Bar?</h1>;
}

const Business = (props) => {
  return (<React.Fragment>
            {props.data !== undefined && props.data !== null &&
            <React.Fragment>
              <h1>{props.data.name}</h1>
              <h2>{props.data.address}</h2>
              <h3>Suggested By: {props.data.username}</h3>
            </React.Fragment>}
          </React.Fragment>);
}

Business.propTypes = {
  data: PropTypes.object
}

class Content extends Component {

  render() {
    let content;

    if (this.props.content === "default") {
      content = <Index />;
    } else if (this.props.content === "suggest") {
      content = <SuggestForm />;
    } else if (this.props.content === "restaurant" || "bar") {
      content = <Business data={this.props.data} />
    }

    return (
      <React.Fragment>
        {this.props.content !== "default" &&
          <div className="Content-header">
            <button className="button-primary" onClick={this.props.toHome}>Back</button>
          </div>
        }
        {content}
      </React.Fragment>
    )
  }
}

Content.propTypes = {
  content: PropTypes.string,
  data: PropTypes.object,
  toHome: PropTypes.func
}

export default Content;
