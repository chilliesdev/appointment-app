import { Signin, Signout, Signup } from "./auth/views";

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
  {
    path: "/signout",
    protectedRoute: true,
    component: Signout,
  },
];

export default Routes;
