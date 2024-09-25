import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Students from "./Pages/Students";
import Home from "./Pages/Home";
import Teachers from "./Pages/Teachers";
import Classes from "./Pages/Classes";
import MainLayout from "./Components/MainLayout";

function App() {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/students",
                    element: <Students />,
                },
                {
                    path: "/teachers",
                    element: <Teachers />,
                },
                {
                    path: "/classes",
                    element: <Classes />,
                },
            ]
        },

    ]);

    return (
        <RouterProvider router={router} />
    )
}
export default App;