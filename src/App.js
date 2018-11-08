import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "default"
    };

    // bind this
    this.suggest = this.suggest.bind(this);
    this.findRestaurant = this.findRestaurant.bind(this);
    this.findBar = this.findBar.bind(this);
  }

  suggest() {
    this.setState(state => ({
      content: "suggest"
    }));
  }

  findRestaurant() {
    this.setState(state => ({
      content: "restaurant"
    }));
  }

  findBar() {
    this.setState(state => ({
      content: "bar"
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">What To Eat</h1>
          <button className="button-header" onClick={this.suggest}>Suggest</button>
        </header>
        {this.state.content}
        <div className="App-content">
          <button className="button-primary" onClick={this.findRestaurant}>Find a Restaurant</button>
          <button className="button-primary" onClick={this.findBar}>Find a Bar</button>
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
