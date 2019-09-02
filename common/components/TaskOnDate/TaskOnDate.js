import React, { Component } from 'react';
import './TaskOnDate.css';

export default class TaskOnDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
	  const { date, tasks } = this.props;
    const dateString = new Date(date).toDateString();
    return (
      <div className="task-card">
        <h5 className="card-title">{dateString}</h5>
        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item" key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
