import DefaultLayout from "../components/layout/DefaultLayout";
import privateRoute from "../components/private-route";
import { routeModel } from "../model/route.model";
import Home from "../page/home";

export const routeList: Array<routeModel> = [
  {
    element: privateRoute,
    children: [
      {
        element: DefaultLayout,
        children: [
          {
            element: Home,
            path: "/",
          },
        ],
      },
    ],
  },
];
