import DefaultLayout from "../components/layout/default-layout/DefaultLayout";
import privateRoute from "../components/private-route";
import { routeModel } from "../types/route.model";
import NotFound from "../page/notfound";
import Dashboard from "../page/dashboard/Dashboard";
import pockets from "../page/pockets";
import Home from "../page/home/Home";

export const routeList: Array<routeModel> = [
  {
    path: "/",
    element: Home,
  },
  {
    element: privateRoute,
    children: [
      {
        element: DefaultLayout,
        children: [
          {
            element: Dashboard,
            path: "/dashboard",
          },
          {
            element: pockets,
            path: "/pockets",
          },
        ],
      },
    ],
  },
  { path: "*", element: NotFound },
];
