import { createBrowserRouter } from "react-router-dom";

// Layouts
import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import NormalLayout from "./components/Layouts/NormalLayout";

// Main Pages
import Home from "./pages/Home";
import Video from "./pages/Video";
import Search from "./pages/Search";
import Signin from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";
import UploadPage from "./pages/UploadPage";

// Dashboard Pages
import VideoPage from "./pages/Dashboard/VideoPage";
import VideosPage from "./pages/Dashboard/VideosPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import AnalyticsPage from "./pages/Dashboard/AnalyticsPage";

// Admin Pages
import Dashboard from "./pages/Dashboard/Admin/Dashboard";
import AdminVideos from "./pages/Dashboard/Admin/Videos";
import Categories from "./pages/Dashboard/Admin/Categories";
import Users from "./pages/Dashboard/Admin/Users";

const router = createBrowserRouter([
    {
        element: <NormalLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Search/:query?",
                element: <Search />,
            },
            {
                path: "/:slug",
                element: <Video />,
            },
            {
                path: "/User",
                element: <UserLayout />,
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
                    {
                        path: "Videos",
                        element: <AdminVideos />,
                    },
                    {
                        path: "Users",
                        element: <Users />,
                    },
                    {
                        path: "Categories",
                        element: <Categories />,
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
