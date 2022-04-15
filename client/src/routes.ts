import { Signin, Signup } from "./auth/views";

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
