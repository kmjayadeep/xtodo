import React from 'react';
import Header from './components/Header';
import Body from './components/Body';

export default function () {
  return (
    <div>
      <div className="container">
        <Header />
      </div>
      <br />
      <div className="container">
        <Body />
      </div>
    </div>
  );
}
