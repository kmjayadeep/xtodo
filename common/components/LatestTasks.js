import React from 'react';
import TaskOnDate from './TaskOnDate/TaskOnDate';


export default function LatestTasks({ latestTasks }) {
  return (
    <div className="container">
      {
        latestTasks.map((tasksOnDate) => (
          <TaskOnDate date={tasksOnDate.date} tasks={tasksOnDate.tasks} key={tasksOnDate.date} />
        ))
      }
    </div>
  );
}
