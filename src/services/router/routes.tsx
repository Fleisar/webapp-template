import HomePage from "@/pages/home/HomePage.tsx";
import {Navigate, RouteObject} from "react-router-dom";
import {Paths} from "@/shared/config/paths.ts";

export const routes: RouteObject[] = [
  {
    path: Paths.Home,
    element: <HomePage />
  },
  {
    path: '',
    element: <Navigate to={Paths.Home} />
  }
];
