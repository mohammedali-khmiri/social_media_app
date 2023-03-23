import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  /**
   * Layout is a function that returns a div that contains a Navbar, a LeftBar, an Outlet, and a
   * RightBar.
   */
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />

          <div style={{ flex: "6" }}>
            <Outlet />
          </div>

          <RightBar />
        </div>
      </div>
    );
  };

  /**
   * If the user is not logged in, redirect them to the login page. Otherwise, render the children
   * @returns The children of the ProtectedRoute component.
   */
  const ProtectedRoute = ({ children }) => {
    // if (!currentUser) {
    //   return <Navigate to="/login" />;
    // }
    // return children;
  };

  /* Creating a router object that contains the routes for the application. */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
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
  ]);

  /* Providing the router object to the RouterProvider component. This component is a context provider
	that provides the router object to the rest of the application. */
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
