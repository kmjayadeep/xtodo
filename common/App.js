import React, { Component } from 'react';
import TaskOnDate from './components/TaskOnDate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { latestTasks: [] };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/task')
      .then((response) => response.json())
      .then((tasks) => {
        console.log(tasks);
        this.setState(tasks);
      });
  }

  render() {
    const { latestTasks } = this.state;
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
}
