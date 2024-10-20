import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Settimer from "./pages/Settimer/Settimer.jsx";
import Timeranalog from "./pages/TimerAnalog/Timeranalog.jsx";
import Timerdigital from "./pages/TimerDigital/Timerdigital.jsx";
import { TimerContextProvider } from "./components/TimerContext/TimerContext.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <TimerContextProvider>
                <App />
            </TimerContextProvider>
        ),
        errorElement: <div>404</div>,
        children: [ 
            { path: "/", element: <Home />, index: true },
            { path: "/settimer", element: <Settimer />},
            { path: "/timeranalog", element: <Timeranalog />},
            { path: "/timerdigital", element: <Timerdigital />},


        ]
    }
]);

export default router;