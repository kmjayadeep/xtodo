import React, { Component } from 'react';

export default class TaskOnDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
	  const { date, tasks } = this.props;
		const dateString = new Date(date).toDateString();
    return (
      <div>
        <div className="row">
          <div className="col">
            <h1 className="display-4">{dateString}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
