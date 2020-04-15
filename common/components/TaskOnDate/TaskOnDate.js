import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateToReadableDay } from '../../utils/dateUtils';
import './TaskOnDate.css';

export default class TaskOnDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: null,
    };
    this.onAddTask = this.onAddTask.bind(this);
    this.onSaveTask = this.onSaveTask.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event) {
    const { newTask } = this.state;
    this.setState({
      newTask: {
        ...newTask,
        title: event.target.value,
      },
    });
  }

  onSaveTask() {
    const { newTask } = this.state;
    console.log(newTask);
    fetch('http://localhost:3000/api/task', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(JSON.stringify(response));
      });
  }

  onAddTask() {
    const { date } = this.props;
    this.setState({
      newTask: {
        title: '',
        dueBy: date,
      },
    });
  }

  render() {
    const { date, tasks } = this.props;
    const readableDate = dateToReadableDay(new Date(date));
    const dateString = new Date(date).toDateString();
    const { newTask } = this.state;
    return (
      <div className="task-card">
        <div className="row">
          <div className="col">
            <h5 className="card-title">{readableDate}</h5>
          </div>
          <div className="col">
            <h6 className="card-title">{dateString}</h6>
          </div>
        </div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item" key={task.id}>{task.title}</li>
          ))}
        </ul>
        { newTask != null
        && (
          <div className="row">
            <div className="col">
              <input type="text" text={newTask.title} onChange={this.onTitleChange} />
            </div>
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={this.onSaveTask}>
                Save
              </button>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={this.onAddTask}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TaskOnDate.propTypes = {
  date: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
