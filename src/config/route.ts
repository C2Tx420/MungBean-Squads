import DefaultLayout from "../components/layout/default-layout/DefaultLayout";
import PrivateRoute from "../components/private-route";
import { routeModel } from "../types/route.model";
import NotFound from "../page/notfound";
import Dashboard from "../page/dashboard/Dashboard";
import Pockets from "../page/pockets";
import Home from "../page/home/Home";
import Community from "../page/community";
import CommunityDetail from "../page/community-detail/CommunityDetail";
import Config from "../page/config";

export const routeList: Array<routeModel> = [
  {
    path: "/",
    element: Home,
  },
  {
    path: '/community',
    element: Community,
  },
  {
    path: '/community/:id',
    element: CommunityDetail
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
            element: Config,
            path: "/config",
          },
        ],
      },
    ],
  },
  { path: "*", element: NotFound },
];
