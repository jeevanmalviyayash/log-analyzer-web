import React from "react";
import "../css/Modal.css";

const Modal = ({ message, onContinue }) => {
  return (
    <div className="success-modal">
      <div className="success-box">
        <div className="success-icon">✔</div>
        <h2>SUCCESS</h2>
        <p>{message}</p>
        <button onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
};

export default Modal;
