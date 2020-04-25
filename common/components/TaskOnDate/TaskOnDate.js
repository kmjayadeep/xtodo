/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useState } from 'react';
import { dateToReadableDay } from '../../utils/dateUtils';
import { addTask } from '../../services/api';
import { useStateValue } from '../../state/state';
import './TaskOnDate.css';
import Task from './Task';


export default function ({ date, tasks }) {

  const readableDate = dateToReadableDay(new Date(date));
  const dateString = new Date(date).toDateString();

  const [newTask, setNewTask] = useState(null);

  const [{ isStale }, dispatch] = useStateValue();

  const onAddTask = useCallback(() => {
    setNewTask({
      dueBy: date,
    });
  }, [setNewTask]);


  const saveNewTask = useCallback(async () => {
    console.log(newTask);
    await addTask(newTask);
    dispatch({
      type: 'setStale',
    });
    setNewTask(null);
  }, [newTask, dispatch]);


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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      saveNewTask();
                    }
                  }}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveNewTask}
                  style={{
                    marginRight: '0.2rem',
                  }}
                >
                  <i className="fa fa-save" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setNewTask(null);
                  }}
                >
                  <i className="fa fa-times" />
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
