import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/AuthProvider.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

import MainLayout from './layout/MainLayout.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx'; 
import PrivateRoute from './routes/PrivateRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllProperties from './pages/AllProperties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import NotFound from './pages/NotFound.jsx';

// Dashboard Pages
// DashboardOverview এর বদলে DashboardHome ইমপোর্ট করা হয়েছে
import DashboardHome from './pages/Dashboard/DashboardHome.jsx'; 
import AddProperties from './pages/AddProperties.jsx';
import MyProperties from './pages/MyProperties.jsx';
import MyRatings from './pages/MyRatings.jsx';
import UpdateProperty from './pages/UpdateProperty.jsx';
import Profile from './pages/Dashboard/Profile.jsx';

// অতিরিক্ত পেইজ (অ্যাসাইনমেন্ট রিকয়ারমেন্ট ৮ অনুযায়ী)
// এই ফাইলগুলো তৈরি না করে থাকলে সাময়িকভাবে কমেন্ট করে রাখতে পারেন
// import About from './pages/About.jsx';
// import Contact from './pages/Contact.jsx';

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
      // { path: '/about', element: <About /> }, // অতিরিক্ত পেইজ
      // { path: '/contact', element: <Contact /> }, // অতিরিক্ত পেইজ
      {
        path: '/property-details/:id',
        element: <PropertyDetails />, 
        loader: ({ params }) => fetch(`https://homenest-server-one.vercel.app/properties/${params.id}`)
      },
    ],
  },
  {
    path: '/dashboard', 
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // এখানে index: true ব্যবহার করা ভালো যাতে /dashboard এ গেলে সরাসরি এটা দেখায়
      { index: true, element: <DashboardHome /> }, 
      { path: 'profile', element: <Profile /> }, 
      { path: 'add-properties', element: <AddProperties /> },
      { path: 'my-properties', element: <MyProperties /> },
      { path: 'my-ratings', element: <MyRatings /> },
      {
        path: 'update-property/:id',
        element: <UpdateProperty />,
        loader: ({ params }) => fetch(`https://homenest-server-one.vercel.app/properties/${params.id}`)
      },
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