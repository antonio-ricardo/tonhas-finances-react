import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrincipalScreen } from './pages/PrincipalScreen';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginScreen } from './pages/LoginScreen';
import { GlobalStyle } from './styles/global';
import { AuthenticateProvider } from './hooks/useAuthenticate';
import { SingUpScreen } from './pages/SingUpScreen';


const router = createBrowserRouter([
  {
    path: "/login",
    element:
      <AuthenticateProvider>
        <LoginScreen />
      </AuthenticateProvider>
  },
  {
    path: "/singup",
    element: <SingUpScreen />
  },
  {
    path: '/dashboard',
    element: <PrincipalScreen />
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyle />
  </React.StrictMode >
);
