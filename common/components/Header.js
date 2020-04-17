import React from 'react';

export default function () {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/">xTodo</a>
      <div className="navbar-nav mr-auto">
        {/* <a className="nav-item nav-link active" href="/">
          Home
        </a> */}
      </div>
      <div className="navbar-nav">
        <a className="nav-item nav-link bg-primary add-button" href="/#new">
          <i className="fa fa-plus" />
          <b>NEW</b>
        </a>
      </div>
    </nav>
  );
}
