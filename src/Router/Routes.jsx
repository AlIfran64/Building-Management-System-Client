import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Apartment from "../Pages/Apartment/Apartment";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Announcement from "../Pages/Announcement/Announcement";
import MakePayment from "../Pages/MakePayment/MakePayment";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import ManageMembers from "../Pages/ManageMembers/ManageMembers";
import MakeAnnouncement from "../Pages/MakeAnnounce/MakeAnnouncement";
import AgreementRequests from "../Pages/AgreementRequest/AgreementRequests";
import ManageCoupons from "../Pages/ManageCoupons/ManageCoupons";

export const router = createBrowserRouter([

  // Main Layout Route
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/apartment',
        element: <Apartment></Apartment>
      }
    ]
  },

  // Auth Layout Route
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }

    ]
  },


  // Dashboard layout route
  {
    path: '/dashboard',
    element:
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'announcement',
        element: <Announcement></Announcement>
      },
      {
        path: 'makePayment',
        element: <MakePayment></MakePayment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageMembers',
        element: <ManageMembers></ManageMembers>
      },
      {
        path: 'makeAnnouncement',
        element: <MakeAnnouncement></MakeAnnouncement>
      },
      {
        path: 'agreementRequests',
        element: <AgreementRequests></AgreementRequests>
      },
      {
        path: 'manageCoupons',
        element: <ManageCoupons></ManageCoupons>
      }
    ]
  },

  // Error page
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);
