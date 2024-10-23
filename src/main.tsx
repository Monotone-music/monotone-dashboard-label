import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from './page/Auth/AuthPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-up" replace />, // Redirect root path to /signUp
  },
  {
    path: "/sign-up",
    element: <AuthPage />, // Route for SignUp component
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
