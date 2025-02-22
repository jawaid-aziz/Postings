import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import { AllRoutes } from './Routes';
import './index.css'

createRoot(document.getElementById("root")).render(<Main />);

function Main() {
  const router = createBrowserRouter(AllRoutes);

  return(
    <StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  )
}

export default Main;