/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useCallback, useState } from 'react';

import { addTask } from '../../services/api';
import { useStateValue } from '../../state/state';

export default function ({ onClose }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueBy, setDueBy] = useState(new Date().toISOString().split('T')[0]);
  const [{ isStale }, dispatch] = useStateValue();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSave = useCallback(async (task) => {
    await addTask(task);
    dispatch({
      type: 'setStale',
    });
    handleClose();
  }, [handleClose, dispatch]);

  const handleEscape = useCallback((event) => {
    if (event.keyCode === 27) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape]);

  return (
    <div className="modal new-task fade show">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">NEW TASK</h6>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form>
              <div className="form-group">
                <label htmlFor="inputTitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder="Finish office work..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDate">Due date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueBy}
                  onChange={(e) => {
                    setDueBy(e.target.value);
                    console.log(dueBy);
                  }}
                  id="inputDate"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleSave({
                  title,
                  dueBy,
                  description,
                });
              }}>
              <i className="fa fa-save" />
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
