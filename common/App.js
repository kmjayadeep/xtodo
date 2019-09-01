import React, { Component } from 'react';

export default class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/api/task')
      .then((response) => response.json())
      .then((tasks) => {
        console.log(tasks);
      });
  }

  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}
