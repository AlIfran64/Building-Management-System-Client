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
import PaymentProceed from "../Pages/MakePayment/PaymentProceed";
import AdminRoutes from "./AdminRoutes";
import Forbidden from "../Pages/Forbidden/Forbidden";
import DashboardRedirect from "../Pages/DashboardRedirect/DashboardRedirect";
import MemberRoutes from "./MemberRoutes";
import UserAndMemberRoutes from "./UserAndMemberRoutes";

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
        index: true,
        element: <DashboardRedirect></DashboardRedirect>
      },
      {
        path: 'myProfile',
        element:
          <UserAndMemberRoutes>
            <MyProfile></MyProfile>
          </UserAndMemberRoutes>
      },
      {
        path: 'announcement',
        element:
          <UserAndMemberRoutes>
            <Announcement></Announcement>
          </UserAndMemberRoutes>
      },

      // Member
      {
        path: 'makePayment',
        element:
          <MemberRoutes>
            <MakePayment></MakePayment>
          </MemberRoutes>
      },
      {
        path: 'paymentProceed/:id',
        element:
          <MemberRoutes>
            <PaymentProceed></PaymentProceed>
          </MemberRoutes>
      },
      {
        path: 'paymentHistory',
        element:
          <MemberRoutes>
            <PaymentHistory></PaymentHistory>
          </MemberRoutes>
      },

      // Admin
      {
        path: 'adminProfile',
        element: <AdminRoutes>
          <AdminProfile></AdminProfile>
        </AdminRoutes>
      },
      {
        path: 'manageMembers',
        element:
          <AdminRoutes>
            <ManageMembers></ManageMembers>
          </AdminRoutes>
      },
      {
        path: 'makeAnnouncement',
        element:
          <AdminRoutes>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoutes>
      },
      {
        path: 'agreementRequests',
        element:
          <AdminRoutes>
            <AgreementRequests></AgreementRequests>
          </AdminRoutes>
      },
      {
        path: 'manageCoupons',
        element:
          <AdminRoutes>
            <ManageCoupons></ManageCoupons>
          </AdminRoutes>
      }
    ]
  },

  // Forbidden
  {
    path: '/forbidden',
    element: <Forbidden></Forbidden>
  },

  // Error page
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);
