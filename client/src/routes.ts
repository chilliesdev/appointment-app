import { Signin, Signout, Signup } from "./auth/views";
import { Profile } from "./pages";

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
  {
    path: "/profile",
    protectedRoute: true,
    component: Profile,
  },
];

export default Routes;
