import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from '../assets/nuclear-logo.png';
import "./Layout.css";

const Layout = ({ title }) => {

  return (
    <div>
      <div className="header">
        <div>
          <Link to="/home" className="link-layout">
            <img src={logo} alt="Logo" id="logo" />
          </Link>
        </div>
        <div className="layout">
          <div>
            <Link to="/actions" className="link-layout" id="newAppletSel">
              New Applets
            </Link>
          </div>
          <div>
            <Link to="/services" className="link-layout" id="ServicesButtonSel">
              Services
            </Link>
          </div>
          <div>
            <Link to="/downlaodApk" className="link-layout">
              Download APK
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
