import { MainLayout } from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import TalentList from "@/pages/talent/TalentList";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const JobList = lazy(() => import("@/pages/jobs/JobList"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jobs",
        element: <JobList />,
      },
      {
        path: "/talents",
        element: <TalentList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
