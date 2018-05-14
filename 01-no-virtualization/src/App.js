import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import loremIpsum from 'lorem-ipsum';

const rowCount = 1000;

class App extends Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.list = Array(rowCount).fill().map((val, idx) => {
      return {
        id: idx, 
        name: 'John Doe',
        image: 'http://via.placeholder.com/40',
        text: loremIpsum({
          count: 1, 
          units: 'sentences',
          sentenceLowerBound: 4,
          sentenceUpperBound: 8 
        })
      }
    });
  }
  
  renderRow(item) {
    return (
      <div key={item.id} className="row">
        <div className="image">
          <img src={item.image} alt="" />
        </div>
        <div className="content">
          <div>{item.name}</div>
          <div>{item.text}</div>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="list">
          {this.list.map(this.renderRow)}
        </div>
      </div>
    );
  }
}

export default App;
