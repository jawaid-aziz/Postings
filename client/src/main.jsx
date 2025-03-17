import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AllRoutes } from './Routes';
import { AuthProvider } from './Context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import './index.css'

createRoot(document.getElementById("root")).render(<Main />);

function Main() {
  const router = createBrowserRouter(AllRoutes);

  return(
    <StrictMode>
      <AuthProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <RouterProvider router={router} />
      </AuthProvider>      
    </StrictMode>
  )
}

export default Main;