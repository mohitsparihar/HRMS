import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/middleware/route-guard";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgetPassword = lazy(() => import("@/pages/auth/ForgetPassword"));
const JobList = lazy(() => import("@/pages/jobs/JobList"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const TalentList = lazy(() => import("@/pages/talent/TalentList"));

/**
 * Defines the application's route configuration.
 * 
 * The route configuration is structured into three main sections:
 * 
 * ## Protected Routes (/)
 * - Guarded by {@link ProtectedRoute}
 * - Contains {@link MainLayout} with:
 *   - Root redirect to /jobs
 *   - Dashboard view
 *   - Jobs management
 *   - Talent management
 * 
 * ## Public Route (/home)
 * - Renders the landing page
 * 
 * ## Authentication Routes
 * - Managed by {@link AuthLayout}
 * - /login - User authentication
 * - /register - New user registration
 * - /forget_password - Password recovery
 * 
 * @type {import('react-router-dom').RouteObject[]}
 * 
 * @example
 * ```tsx
 * {
 *   path: "/",
 *   element: <ProtectedRoute />,
 *   children: [
 *     {
 *       element: <MainLayout />,
 *       children: [
 *         { path: "jobs", element: <JobList /> }
 *       ]
 *     }
 *   ]
 * }
 * ```
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/jobs" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "jobs",
            element: <JobList />,
          },
          {
            path: "talents",
            element: <TalentList />,
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget_password",
        element: <ForgetPassword />,
      },
    ],
  },
];
