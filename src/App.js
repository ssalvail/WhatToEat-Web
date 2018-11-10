import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Content from './components/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "default",
      result: null,
      loading: false
    };
  }

  suggest = () => {
    this.setState(state => ({
      content: "suggest"
    }));
  }

  findRestaurant = () => {
    this.setState(state => ({
      content: "restaurant",
      loading: true
    }));
    fetch("https://dark-ghoul-26887.herokuapp.com/get_suggestion")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            data: result[0]
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            loading: false
          });
          console.log(error);
        }
      )
  }

  findBar = () => {
    this.setState(state => ({
      content: "bar"
    }));
  }

  toHome = () => {
    this.setState(state => ({
      content: "default",
      data: null
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">What To Eat</h1>
          <button className="button-header" onClick={this.suggest}>Suggest</button>
        </header>
        <div className={"App-content " + (this.state.loading ? 'loading' : '')}>
          <Content 
            content={this.state.content}
            data={this.state.data}
            toHome={this.toHome}>
          </Content>
          {this.state.content === "default" &&
            <div>
              <button className="button-primary" onClick={this.findRestaurant}>Find a Restaurant</button>
              <button className="button-primary" onClick={this.findBar}>Find a Bar</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
