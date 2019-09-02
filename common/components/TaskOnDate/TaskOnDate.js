import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateToReadableDay } from '../../utils/dateUtils';
import './TaskOnDate.css';

export default class TaskOnDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { date, tasks } = this.props;
    const readableDate = dateToReadableDay(new Date(date));
    const dateString = new Date(date).toDateString();
    return (
      <div className="task-card">
        <div className="row">
          <div clasName="col">
            <h5 className="card-title">{readableDate}</h5>
          </div>
          <div clasName="col">
            <h7 className="card-title">{dateString}</h7>
          </div>
        </div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item" key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

TaskOnDate.propTypes = {
  date: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
