import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import SingleVideo from "./pages/SingleVideo/SingleVideo";
import ProfilePage from "./pages/Profile/ProfilePage";
import VideosPage from "./pages/Videos/VideosPage";
// import UserLayout from "./components/Layouts/UserLayout";
import SettingsPage from "./pages/Settings/SettingsPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import AnalyticsSinglePage from "./pages/AnalyticsSingle/AnalyticsSinglePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/video/:id",
        element: <SingleVideo />,
    },
    {
        path: "/Auth",
        children: [
            {
                path: "Login/:social?",
                element: <Signin />,
            },
            {
                path: "Register",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/user/:id",
        // element: <UserLayout />,
        children: [
            {
                path: "/user/:id/profile",
                name: "profile",
                element: <ProfilePage />,
            },
            {
                path: "/user/:id/analytics",
                element: <AnalyticsPage />,
            },
            {
                path: "/user/:id/singleAnalytic",
                element: <AnalyticsSinglePage />,
            },
            {
                path: "/user/:id/videos",
                element: <VideosPage />,
            },
            {
                path: "/user/:id/promotion",
                element: <ProfilePage />,
            },
            {
                path: "/user/:id/settings",
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: "",
        children: [
            {
                path: "/admin",
                element: "",
            },
        ],
    },
]);

export default router;
