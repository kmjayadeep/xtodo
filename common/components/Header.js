import React, { useState } from 'react';


import NewTask from './NewTask/NewTask';

export default function () {

  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">xTodo</a>
        <div className="navbar-nav mr-auto">
          {/* <a className="nav-item nav-link active" href="/">
          Home
        </a> */}
        </div>
        <div className="navbar-nav">
          <a
            className="nav-item nav-link bg-primary add-button"
            role="button"
            onKeyDown={() => {
              setShow(true);
            }}
            tabIndex="0"
            onClick={() => {
              setShow(true);
            }}
          >
            <i className="fa fa-plus" />
            <b>NEW</b>
          </a>
        </div>
      </nav>
      <NewTask
        show={show}
        onClose={() => {
          setShow(false);
        }}
      />
    </>
  );
}
