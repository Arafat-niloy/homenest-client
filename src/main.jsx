import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Context Providers
import AuthProvider from './contexts/AuthProvider.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// Layout
import MainLayout from './layout/MainLayout.jsx';

// Private Route
import PrivateRoute from './routes/PrivateRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllProperties from './pages/AllProperties.jsx';
import AddProperties from './pages/AddProperties.jsx';
import MyProperties from './pages/MyProperties.jsx';
import MyRatings from './pages/MyRatings.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import UpdateProperty from './pages/UpdateProperty.jsx';
import NotFound from './pages/NotFound.jsx';

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/all-properties', element: <AllProperties /> },
      {
        path: '/property-details/:id',
        element: <PrivateRoute><PropertyDetails /></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`https://homenest-server-one.vercel.app/properties/${params.id}`)
      },
      { path: '/add-properties', element: <PrivateRoute><AddProperties /></PrivateRoute> },
      { path: '/my-properties', element: <PrivateRoute><MyProperties /></PrivateRoute> },
      {
        path: '/update-property/:id',
        element: <PrivateRoute><UpdateProperty /></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`https://homenest-server-one.vercel.app/properties/${params.id}`)
      },
      { path: '/my-ratings', element: <PrivateRoute><MyRatings /></PrivateRoute> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
