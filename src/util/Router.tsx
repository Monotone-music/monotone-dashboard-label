// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "@/layout/Root/RootLayout";
import Unauthorized from "@/page/Unauthorized/Unauthorized";
import HomePage from "@/page/Admin/Home/HomePage";
import HomeArtist from "@/page/Artist/Home/HomeArtist";
import Profile from "@/page/Admin/Profile/Profile";
import AuthPage from "@/page/Auth/AuthPage";
import AccountsManagement from "@/page/Admin/Accounts/AccountsManagement";
import ArtistAccount from "@/page/Admin/Accounts/Artist/ArtistAccount";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" replace />, // Redirect root path to /auth/sign-in
  },
  {
    path: "/auth/sign-in",
    element: <AuthPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "overview", element: <HomePage /> },
      {
        path: "accounts-management",
        element: <AccountsManagement />,
        children: [
          { path: "artist", element: <ArtistAccount /> },
          // { path: "music-label", element: <MusicLabelAccount /> },
          // { path: "distributor", element: <DistributorAccount /> },
          // { path: "advertiser", element: <AdvertiserAccount /> },
        ],
      },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/artist",
    element: (
      <ProtectedRoute allowedRoles={['artist']}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "overview", element: <HomeArtist /> },
      // Add other artist routes here
    ],
  },
  // Add routes for other roles as needed
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/sign-in" replace />, // Redirect any undefined routes to /auth/sign-in
  },
]);

export default router;
