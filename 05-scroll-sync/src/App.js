import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import loremIpsum from 'lorem-ipsum';

import { List, AutoSizer, ScrollSync } from "react-virtualized";

const rowCount = 1000;
const rowHeight = 50;

class App extends Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
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
        }),
      }
    });
  }
  
  renderColumn({ index, key, style }) {
    return (
          <div key={key} style={style} className="row">
            <div className="content">
              <div>{this.list[index].id}</div>
            </div>
          </div>
    );
  }
  
  renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
        <div className="image">
          <img src={this.list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{this.list[index].name}</div>
          <div>{this.list[index].text}</div>
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
          <ScrollSync>
            {({ onScroll, scrollTop, scrollLeft }) => (
              <div className="list">
                <span>{scrollTop} - {scrollLeft}</span>
                <AutoSizer disableWidth>
                {
                  ({ height }) => {
                    return (
                      <div>
                        <div 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}>
                            <List
                              className="leftSide"
                              width={50}
                              height={height}
                              rowHeight={rowHeight}
                              scrollTop={scrollTop}
                              rowRenderer={this.renderColumn}
                              rowCount={this.list.length}
                              overscanRowCount={3} />
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 50,
                          }}>
                            <List
                              width={800}
                              height={height}
                              rowHeight={rowHeight}
                              onScroll={onScroll}
                              rowRenderer={this.renderRow}
                              rowCount={this.list.length}
                              overscanRowCount={3} />
                        </div>
                      </div>
                    )
                  }
                }
                </AutoSizer>
              </div>
            )
          }
          </ScrollSync>
      </div>
    );
  }
}

export default App;