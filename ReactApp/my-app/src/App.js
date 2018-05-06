import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './component/menu';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Menu/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
