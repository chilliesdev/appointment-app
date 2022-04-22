import { Signin, Signout, Signup } from "./auth/views";
import { Create, Profile } from "./pages";

type RouteType = {
  path: string;
  protectedRoute: boolean;
  component: () => JSX.Element;
}[];

export const Routes: RouteType = [
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
  {
    path: "/create",
    protectedRoute: true,
    component: Create,
  },
];

export default Routes;
