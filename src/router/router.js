import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import AuthLayout from "../pages/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserLayout from "../pages/user/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import { authLoader } from "../loaders/auth.loader";
import { authGuardLoader } from "../loaders/authGuard.loader";
import NotFound from "../pages/not-found/NotFound";
import Users from "../pages/user/Users";
import Homepage from "../pages/user/Homepage";
import Favourites from "../pages/cocktails/Favourites";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/auth",
				element: <AuthLayout />,
				loader: authLoader,
				children: [
					{
						index: true,
						element: <Login />,
					},
					{
						path: "/auth/login",
						element: <Login />,
					},
					{
						path: "/auth/register",
						element: <Register />,
					},
				],
			},
			{
				path: "/",
				element: <UserLayout />,
				loader: authGuardLoader,
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
					{
						path: "/user/dashboard",
						element: <Dashboard />,
					},
					{
						path: "/user/users",
						element: <Users />,
					},
				],
			},
			{
				path: "/home",
				element: <UserLayout />,
				loader: authGuardLoader,
				children: [
					{
						index: true,
						element: <Homepage />,
					},
				],
			},
			{
				path: "/favourites",
				element: <UserLayout />,
				loader: authGuardLoader,
				children: [
					{
						index: true,
						element: <Favourites />,
					},
				],
			},
		],
	},
]);
