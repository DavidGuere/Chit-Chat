import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Auth from "../util/Auth";

interface IProtRouteProps extends RouteProps {}
const ProtectedRoute: React.FC<IProtRouteProps> = ({ ...rest }) => {
  const userIdStr: string | null = sessionStorage.getItem("localUserId");
  const userId: number | null = userIdStr !== null ? parseInt(userIdStr) : null;
  var logged;

  if (userId !== null && userId !== 0) {
    Auth.isUserLogged(userId).then((res) => (logged = res));
  } else {
    logged = false;
  }

  if (logged === false) return <Redirect to="/Chit-Chat/" />;
  return <Route {...rest}></Route>;
};

export default ProtectedRoute;
