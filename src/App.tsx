import React from "react";
import logo from "./logo.svg";

import "./App.css";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { routes } from "./routes";

import Layout from "./layout/Layout";
import SignIn from "./pages/Auth/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(
    (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn
  );
  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      ) : (
        <Navigate to="/signin" />
      )}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
