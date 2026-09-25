import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import NewsFeed from "./pages/NewsFeed/NewsFeed"
import Profile from "./pages/Profile/Profile"
import Notifications from "./pages/Notifications/Notifications"
import Notfound from "./pages/Notfound/Notfound"
import MainLayout from "./layouts/MainLayout"
import { Toaster } from "react-hot-toast"
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes"
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes"
import PostDetails from "./pages/PostDetails/PostDetails"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import SavedPosts from "./pages/SavedPost/SavedPost"

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/auth", element: <AuthProtectedRoutes><AuthLayout /></AuthProtectedRoutes>, children: [
        { index: true, element: <Navigate to={"login"} /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ]
    },
    {
      path: "", element: <AppProtectedRoutes><MainLayout /></AppProtectedRoutes>, children: [
        { index: true, element: <Navigate to={"feed"} /> },
        {
          path: "feed",
          element: <NewsFeed />, children: [
            { path: "my-posts", element: <Profile showMyPosts /> },
            { path: "community", element: <Profile showMyPosts /> },
            { path: "saved", element: <SavedPosts /> },
          ],
        },
        { path: "/profile", element: <Profile /> },
        { path: "/changePassword", element: <ChangePassword /> },
        { path: "/notifications", element: <Notifications /> },
        { path: "/PostDetails/:postId", element: <PostDetails /> },
        { path: "/saved", element: <SavedPosts /> }
      ]
    },
    { path: "*", element: <Notfound /> }
  ])

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}
