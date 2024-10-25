import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from './page/Auth/AuthPage';
import RootLayout from './layout/Root/RootLayout';
import HomePage from './page/Home/HomePage';

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to="/sign-up" replace />, 
  // },
  // {
  //   path: "/sign-up",
  //   element: <AuthPage />, 
  // }

  {path: '/',
    element:<RootLayout/>,
    children:[    {
      path: "",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "home",
      element: <HomePage />,
    },]
  }
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
