import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Layout></Layout></PrivateRoute>,
  },
  {
	path: "/signIn",
	element: <SignIn></SignIn>
  },
  {
	path: "/signUp",
	element: <SignUp></SignUp>
  }
]);

export default router;