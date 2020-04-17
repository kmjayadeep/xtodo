import React from 'react';

export default ({ task }) => {
  return (
    <div className="row justify-content-between task">
      <div className="col-auto">
        <input type="checkbox" checked={task.status === 'COMPLETED'} />
      </div>
      <div className="col">
        <h6 className={`task-title ${task.status === 'COMPLETED' ? 'completed text-secondary' : ''}`}><b>{task.title}</b></h6>
      </div>
      <div className="col-auto task-links">
        <button className="btn btn-light" type="button" title="Edit Task">
          <i className="fa fa-pencil" />
        </button>
        <button className="btn btn-light" type="button" title="Delete Task">
          <i className="fa fa-trash text-danger" />
        </button>
      </div>
    </div>
  );
};
