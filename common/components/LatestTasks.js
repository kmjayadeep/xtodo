import React, { useEffect, useState } from 'react';
import TaskOnDate from './TaskOnDate/TaskOnDate';


export default function LatestTasks() {

  const [latestTasks, setLatestTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/task')
      .then((response) => response.json())
      .then((tasks) => {
        console.log(tasks);
        setLatestTasks(tasks.latestTasks);
      });

  }, []);


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
