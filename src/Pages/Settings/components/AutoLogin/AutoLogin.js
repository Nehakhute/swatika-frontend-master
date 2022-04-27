import { Input } from "antd";
import React from "react";
import "./AutoLogin.scss";

function AutoLogin(props) {
  return (
    <div className="auto-login-wrap">
      <div className="single-field">
        <span>Your User ID</span>
        <Input placeholder="Enter Your User ID" />
      </div>
      <div className="single-field">
        <span>Your Password</span>
        <Input placeholder="Enter Your Password" />
      </div>
      <div className="single-field">
        <span>F2A Password</span>
        <Input placeholder="Enter F2A Password" />
      </div>
      <div className="save-btn">
        <span>Save</span>
      </div>
    </div>
  );
}

export default AutoLogin;
