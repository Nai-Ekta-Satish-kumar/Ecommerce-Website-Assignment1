import React from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
const Modal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const onhandleLogin = () => {
    navigate("/");
  };
  return (
    <div className="modal-content">
      <div className="col-8">
        <div></div>
        <button className="btn btn-danger mx-2" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-primary mx-2" onClick={onhandleLogin}>
          login
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
