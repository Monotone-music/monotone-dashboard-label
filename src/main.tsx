import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import {
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import router from "./util/Router";

const queryClient = new QueryClient(
  {defaultOptions: {queries: {retry: 5, retryDelay: 1000}}}
);

  
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>
);
