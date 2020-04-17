import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { dateToReadableDay } from '../../utils/dateUtils';
import './TaskOnDate.css';
import Task from './Task';


export default function ({ date, tasks }) {

  const readableDate = dateToReadableDay(new Date(date));
  const dateString = new Date(date).toDateString();

  const [newTask, setNewTask] = useState(null);

  const onAddTask = useCallback(() => {
    setNewTask({});
  }, [setNewTask]);


  return (
    <div className="task-card">
      <div className="row">
        <div className="col">
          <h5 className="card-title">{readableDate}</h5>
        </div>
        <div className="col">
          <h6 className="card-title text-right date-display">{dateString}</h6>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-sm add-task-btn" onClick={onAddTask} title="Quick Add">
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item" key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
      {newTask != null
        && (
          <div className="add-task-form">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  placeholder="Do some task..."
                  text={newTask.title}
                  onChange={(e) => {
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    console.log(newTask);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            {/* <div className="row">
              <div className="col">
                <textarea
                  className="form-control"
                  placeholder="Description here"
                  text={newTask.description}
                  onChange={(e) => {
                    setNewTask({
                      ...newTask,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
            </div> */}
          </div>
        )}
    </div>
  );
}

class TaskOnDate {
  constructor(props) {
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
  }
}

TaskOnDate.propTypes = {
  date: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
