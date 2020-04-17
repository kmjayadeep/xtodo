import React, { useState, useCallback, useEffect } from 'react';
import { useStateValue } from '../../state/state';
import { deleteTask } from '../../services/api';

export default ({ task }) => {

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [{ isStale }, dispatch] = useStateValue();

  useEffect(() => {
    if (!isStale) {
      setChecked(task.status === 'COMPLETED');
      setLoading(false);
    }
  }, [isStale]);

  const onSelectChange = useCallback(() => {
    setChecked(!checked);
    setLoading(true);
    dispatch({
      type: 'setStale',
    });
  }, [checked, setChecked, dispatch]);

  const onDelete = useCallback(async () => {
    setLoading(true);
    await deleteTask(task.id);
    dispatch({
      type: 'setStale',
    });
  }, [checked, dispatch]);

  return (
    <div className="row justify-content-between task">
      <div className="col-auto valign-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onSelectChange}
        />
      </div>
      <div className="col valign-center">
        <h6 className={`task-title ${checked ? 'completed text-secondary' : ''}`}><b>{task.title}</b></h6>
      </div>
      <div className="col-auto task-links">
        {loading && (
          <div className="loader">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#18bc9c" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50" />
              </circle>
              <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#2c3e50" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50" />
              </circle>
            </svg>
          </div>
        )}
        {/* <button className="btn btn-light" type="button" title="Edit Task">
          <i className="fa fa-pencil" />
        </button> */}
        <button className="btn btn-light" type="button" title="Delete Task" onClick={onDelete}>
          <i className="fa fa-trash text-danger" />
        </button>
      </div>
    </div>
  );
};
