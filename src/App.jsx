import React from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./utils/globalFunctions";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
    { path: "/*", element: <DefaultLayout /> },
]);

export default function App() {

    return (
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    );
}
