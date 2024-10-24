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
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";

// Dashboard Pages
import VideoPage from "./pages/Dashboard/VideoPage";
import VideosPage from "./pages/Dashboard/VideosPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import Settings from "./pages/Dashboard/Settings";
import AnalyticsPage from "./pages/Dashboard/AnalyticsPage";

// Admin Pages
import Dashboard from "./pages/Dashboard/Admin/Dashboard";
import UsersList from "./pages/Dashboard/Admin/Users/UsersList";
import UsersForm from "./pages/Dashboard/Admin/Users/UsersForm";
import SettingsAdmin from "./pages/Dashboard/Admin/Settings";
import VideosList from "./pages/Dashboard/Admin/Videos/VideosList";
import CategoriesForm from "./pages/Dashboard/Admin/Categories/CategoriesForm";
import CategoriesList from "./pages/Dashboard/Admin/Categories/CategoriesList";

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
                path: "Profile/:id?",
                element: <Profile />,
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
                        path: "Analytics",
                        element: <AnalyticsPage />,
                    },
                    {
                        path: "Profile/:id?",
                        element: <ProfilePage />,
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
                        element: <Settings />,
                    },
                    {
                        path: "Upload",
                        element: <Upload />,
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
                        path: "Users",
                        children: [
                            {
                                path: "",
                                element: <UsersList />,
                            },
                            {
                                path: ":id",
                                element: <UsersForm />,
                            },
                        ]
                    },
                    {
                        path: "Categories",
                        children: [
                            {
                                path: "",
                                element: <CategoriesList />,
                            },
                            {
                                path: ":id",
                                element: <CategoriesForm />,
                            },
                        ]
                    },
                    {
                        path: "Videos",
                        element: <VideosList />,
                    },
                    {
                        path: "Settings",
                        element: <SettingsAdmin />,
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
