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
        <div className="title">Auto Trade</div>
        <div className="body">Are you sure you want to ON Auto Trade?</div>

        <div className="footerbtn">
          <button
            className="dischartbtn"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Auto Trade On
          </button>

          <button
            className="closepostionbtn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
