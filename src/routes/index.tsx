import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import Missions from "../views/Missions";
import Planets from "../views/Planets";
import Astronauts from "../views/Astronauts";
import Rockets from "../views/Rockets";
import Home from "../views/Home";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "missions",
                element: <Missions />
            },
            {
                path: "planets",
                element: <Planets />
            },
            {
                path: "astronauts",
                element: <Astronauts />
            },
            {
                path: "rockets",
                element: <Rockets />
            },
        ]
    }
])