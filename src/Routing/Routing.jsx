/* eslint-disable no-unused-expressions */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import { LoginChecker } from "../Validation/LoginChecker";
import Details from "../Pages/Details";
import UserEditDetails from "../Pages/UserEditDetails";

export default function Routing() {
  const PublicRoutes = [
    {
      name: <SignIn />,
      path: "/signin",
    },
    {
      name: <SignUp />,
      path: "/signup",
    },
  ];
  const PrivateRoutes = [
    {
      name: <Home />,
      path: "/",
    },
    {
      name: <Details />,
      path: "/details",
    },
    {
        name:<UserEditDetails/>,
        path:"/user-details-edit"
    }
  ];

  function AuthRequire({ children, redirectTo }) {
    return LoginChecker() ? children : <Navigate to={redirectTo} />;
  }
  function AuthNotRequire({ children, redirectTo }) {
    return !LoginChecker() ? children : <Navigate to={redirectTo} />;
  }
  return (
    <>
      <Router>
        <Routes>
          {PublicRoutes.map((route) => {
            return (
              <Route
                path={route?.path}
                element={
                  <AuthNotRequire redirectTo="/">{route?.name}</AuthNotRequire>
                }
              />
            );
          })}
          {PrivateRoutes.map((route) => {
            return (
              <Route
                path={route?.path}
                element={
                  <AuthRequire redirectTo="signin">{route?.name}</AuthRequire>
                }
              />
            );
          })}
          <Route />
        </Routes>
      </Router>
    </>
  );
}
