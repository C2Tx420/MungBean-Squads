import DefaultLayout from "../components/layout/default-layout/DefaultLayout";
import PrivateRoute from "../components/private-route";
import { routeModel } from "../types/route.model";
import NotFound from "../page/notfound";
import Dashboard from "../page/dashboard/Dashboard";
import Pockets from "../page/pockets";
import Home from "../page/home/Home";
import Config from "../page/config";
import Transaction from "../page/transactions";

export const routeList: Array<routeModel> = [
  {
    path: "/",
    element: Home,
  },
  {
    element: PrivateRoute,
    children: [
      {
        element: DefaultLayout,
        children: [
          {
            element: Dashboard,
            path: "/dashboard",
          },
          {
            element: Pockets,
            path: "/pockets",
          },
          {
            element: Transaction,
            path: "/transactions",
          },
          {
            element: Config,
            path: "/config",
          },
        ],
      },
    ],
  },
  { path: "*", element: NotFound },
];
