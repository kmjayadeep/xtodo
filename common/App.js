import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Header from './components/Header';
import Body from './components/Body';
import './App.css';

import { StateProvider } from './state/state';
import { reducer, initialState } from './state/reducer';

export default function () {
  return (
    <div>
      <StateProvider
        reducer={reducer}
        initialState={initialState}
      >
        <Router>
          <div className="container">
            <Header />
          </div>
          <div className="container main-body">
            <Body />
          </div>
        </Router>
      </StateProvider>
    </div>
  );
}
