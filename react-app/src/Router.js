import { createBrowserRouter } from "react-router-dom";

// Layouts
import AdminLayout from "./components/Layouts/AdminLayout";
import NormalLayout from "./components/Layouts/NormalLayout";

// Main Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import UploadPage from "./pages/UploadPage";
import SingleVideo from "./pages/SingleVideo";

// Dashboard Pages
import VideoPage from "./pages/Dashboard/VideoPage";
import VideosPage from "./pages/Dashboard/VideosPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import AnalyticsPage from "./pages/Dashboard/AnalyticsPage";

// Admin Pages
import Dashboard from "./pages/Dashboard/Admin/Dashboard";

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
                        path: "Video/:id",
                        element: <VideoPage />,
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
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                ],
            },
        ],
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
]);

export default router;
