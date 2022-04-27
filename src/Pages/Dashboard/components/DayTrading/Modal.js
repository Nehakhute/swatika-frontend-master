import React, { useState } from "react";
import "./modal.scss";
import featureicon from "../../../../Assets/Images/featureicon.svg";
const Modal = ({ setOpenModal }) => {
  return (
    <div className="mainpage">
      <div className="modalBackground">
        <div className="modelcontainer">
          <div className="icons">
            <img className="featureicon" src={featureicon} alt="" />
          </div>
          <div className="icons">
            <button
              className="cancelbtn"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="title">
          <h1>Auto Trade </h1>
        </div>
        <div className="body">
          <p>Are you sure you want to ON Auto Trade?</p>
        </div>

        <div className="footerbtn">
          <button
            className="dischartbtn"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Yes
          </button>
      
          <button
            className="closepostionbtn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
