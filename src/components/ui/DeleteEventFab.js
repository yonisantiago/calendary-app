import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/event";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventStartDelete());
  };

  return (
    <button
      title="Delete event"
      onClick={handleDelete}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};
