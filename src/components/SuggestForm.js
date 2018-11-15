import React, { Component } from 'react';
import './SuggestForm.css';

class SuggestForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      type: 'restaurant',
      username: '',
      submitted: false,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    this.setState({
      submitted: true,
      message: ''
    });

    fetch("https://dark-ghoul-26887.herokuapp.com/create_suggestion", {
      method: 'POST',
      body: JSON.stringify({
        "name": this.state.name,
	      "address": this.state.address,
	      "type": this.state.type,
	      "username": this.state.username
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          submitted: false,
          message: result.message,
          name: '',
          address: '',
          type: 'restaurant',
          username: ''
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          submitted: false,
          message: error,
          name: '',
          address: '',
          type: 'restaurant',
          username: ''
        });
      }
    )

    event.preventDefault();
  }

  render() {
    return (
      <form className="suggest-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Restaurant Name</label>
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
            <input name="address" type="text" value={this.state.address} onChange={this.handleChange} required />
        </div>
        <div className="form-group">
          <label>Type</label>
            <select name="type" value={this.state.type} onChange={this.handleChange} required>
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
            </select>
        </div>
        <div className="form-group">
          <label>Your Name</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <button className="button-submit" type="submit" value="Submit" disabled={this.state.submitted}>{!this.state.submitted ? "Submit" : "Saving..."}</button>
        </div>
        <div>
          {this.state.message}
        </div>
      </form>
    );
  }
}

export default SuggestForm;
