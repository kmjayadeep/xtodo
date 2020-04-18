import React, { useEffect, useCallback, useState } from 'react';

export default function ({ onClose }) {

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
                <input type="text" className="form-control" id="inputTitle" placeholder="Finish office work..." autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="inputDate">Due date</label>
                <input type="date" className="form-control" id="inputDate" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" placeholder="description" />
              </div>
            </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
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
