import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import AuthPage from "./page/Auth/AuthPage";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./layout/Root/RootLayout";
import HomePage from "./page/Admin/Home/HomePage";
// import router from "./util/Router";

const queryClient = new QueryClient(
  {defaultOptions: {queries: {retry: 5, retryDelay: 1000}}}
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" replace />,
  },
  {
    path: "/auth/sign-in",
    element: <AuthPage />,
  },{
    path: '/admin',
    element: (
      <RootLayout/>
    ),
    children: [
      {path: 'overview', element: <HomePage/>}
    ]
  }

]);

  
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}/>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
