import { lazy } from "react";
import { Signin, Signup } from "./auth/views";

// const Signin = lazy(() => import("./auth/views/Signin"));
// const Signup = lazy(() => import("./auth/views/Signup"));

type RouteType = {
  path: string;
  protectedRoute: boolean;
  component: () => JSX.Element;
}[];

const Routes: RouteType = [
  {
    path: "/signin",
    protectedRoute: false,
    component: Signin,
  },
  {
    path: "/signup",
    protectedRoute: false,
    component: Signup,
  },
];

export default Routes;
