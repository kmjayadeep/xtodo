import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import LatestTasks from './LatestTasks';
import NewTask from './NewTask/NewTask';
import { useStateValue } from '../state/state';
import { fetchTasks } from '../services/api';

export default function Body() {

  const [{
    latestTasks, oldTasks, noDueDateTasks, isStale,
  }, dispatch] = useStateValue();

  useEffect(() => {
    if (!isStale) {
      return;
    }
    (async () => {
      const tasks = await fetchTasks();
      dispatch({
        type: 'setTasks',
        tasks,
      });
    })();
  }, [isStale]);

  return (
    <div className="row">
      <div className="col-md-3 d-none d-md-block">
        <div className="list-group">
          <a href="#top" className="list-group-item list-group-item-action active">
            Latest Tasks
          </a>
          <a href="#top" className="list-group-item list-group-item-action">
            Old Tasks
          </a>
          <a href="#top" className="list-group-item list-group-item-action">
            Anytime Tasks
          </a>
        </div>
      </div>
      <div className="col">
        {/* <Switch>
          <Route path="/new">
            <NewTask/>
          </Route>
        </Switch> */}
        <LatestTasks latestTasks={latestTasks} />
        {/* <LatestTasks latestTasks={oldTasks} /> */}
        <LatestTasks latestTasks={noDueDateTasks} />
      </div>
    </div>

  );
}
