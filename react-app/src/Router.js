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
import UploadPage from "./pages/Upload/UploadPage";
import AnalyticsSinglePage from "./pages/AnalyticsSingle/AnalyticsSinglePage";
import NormalLayout from "./components/Layouts/NormalLayout";

const router = createBrowserRouter([
    {
        element: <NormalLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Search",
                element: <Search />,
            },
            {
                path: "/:slug",
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
                path: "/User",
                children: [
                    {
                        path: "Profile/:id?",
                        element: <ProfilePage />,
                    },
                    {
                        path: "Analytics",
                        element: <AnalyticsPage />,
                    },
                    {
                        path: "singleAnalytic",
                        element: <AnalyticsSinglePage />,
                    },
                    {
                        path: "Videos",
                        element: <VideosPage />,
                    },
                    {
                        path: "Promotion",
                        element: <ProfilePage />,
                    },
                    {
                        path: "Settings",
                        element: <SettingsPage />,
                    },
                    {
                        path: "Upload",
                        element: <UploadPage />,
                    },
                ],
            },
            {
                path: "/Admin",
                element: "",
                children: [
                    {
                        path: "Dashboard",
                        element: "",
                    },
                ],
            },
        ],
    },
]);

export default router;
