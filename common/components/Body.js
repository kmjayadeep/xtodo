import React from 'react';
import LatestTasks from './LatestTasks';

export default function Body() {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="list-group">
          <a href="#top" className="list-group-item list-group-item-action active">
            Latest Tasks
          </a>
          <a href="#top" className="list-group-item list-group-item-action">
            Old Tasks
          </a>
          <a href="#top" className="list-group-item list-group-item-action disabled">
            No Due Tasks
          </a>
        </div>
      </div>
      <div className="col-md-8">
        <LatestTasks />
      </div>
    </div>

  );
}
