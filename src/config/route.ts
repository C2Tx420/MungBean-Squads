import DefaultLayout from "../components/layout/default-layout/DefaultLayout";
import privateRoute from "../components/private-route";
import { routeModel } from "../types/route.model";
import NotFound from "../page/notfound";
import Dashboard from "../page/dashboard/Dashboard";
import pockets from "../page/pockets";
import Home from "../page/home/Home";
import Community from "../page/community";

export const routeList: Array<routeModel> = [
  {
    path: "/",
    element: Home,
  },
  {
    element: privateRoute,
    children: [
      { path: '/community',
      element: Community },
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
