import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './Router/Routes';
import ThemeProvider from './Context/Theme/ThemeProvider';
import AuthProvider from './Context/Auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaymentProvider from './Context/Payment/PaymentProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PaymentProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </PaymentProvider>
    </ThemeProvider>
  </StrictMode>,
)
