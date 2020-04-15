import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';

export default function () {
  return (
    <div>
      <div className="container">
        <Header />
      </div>
      <div className="container main-body">
        <Body />
      </div>
    </div>
  );
}
