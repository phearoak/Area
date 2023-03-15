import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Error from "./components/404";
import Actions from "./components/Actions";
import Reactions from "./components/Reactions";
import Layout from "./components/Layout";
import Services from "./components/Services";
import Login from "./components/Login";
import Home from "./components/Home";
import ServicesField from "./components/ServicesField";
import LoginOauth from "./components/LoginOauth";
import Apk from "./components/Apk";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route element={<Layout title="area" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/reactions" element={<Reactions />} />
          <Route path="/ServicesField" element={<ServicesField />} />
          <Route path="/LoginOauth" element={<LoginOauth />} />
          <Route path="/services" element={<Services />} />
          <Route path="/downlaodApk" element={<Apk />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
