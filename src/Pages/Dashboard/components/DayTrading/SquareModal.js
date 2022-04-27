import React, { useState } from "react";
import featureicon from "../../../../Assets/Images/featureicon.svg";
const SquareModal = ({ setSquareModalOpen }) => {
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
                setSquareModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="title">
          <h1>Square Off</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to Square Off?</p>
        </div>

        <div className="footerbtn">
          <button
            className="dischartbtn"
            onClick={() => {
              setSquareModalOpen(false);
            }}
            id="cancelBtn"
          >
           Square Off
          </button>
          <button
            className="closepostionbtn"
            onClick={() => {
              setSquareModalOpen(false);
            }}
          >
            Discard
          </button>
       
        </div>
      </div>
    </div>
  );
};

export default SquareModal;
