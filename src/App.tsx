import './App.scss'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Theme } from '@radix-ui/themes'
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { routeList } from './constant/route';
import { routeModel } from './model/route.model';

function App() {
  const theme: any = useSelector((state: RootState) => state.theme)

  const geneRoute = (routeList: Array<routeModel>) => {
    return routeList.map((route: routeModel, idx: number) => {
      return (
        <Route key={idx} path={route.path}  element={route.element && <route.element />}>
          {route.children && geneRoute(route.children)}
        </Route>
      );
    });
  }
  

  return (
    <Theme appearance={theme} className={`theme-wrapper ${theme}`}>
      <BrowserRouter>
        <Routes>
          {geneRoute(routeList)}
        </Routes>
      </BrowserRouter>
    </Theme>
  )
}

export default App
