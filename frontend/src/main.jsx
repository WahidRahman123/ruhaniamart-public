import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./assets/Pages/Home/Home.jsx";

import Confirm from "./assets/Pages/Confirm.jsx";
import Checkout from "./assets/Pages/Chekout.jsx";

import Registration from "./assets/Pages/Registration.jsx";
import Login from "./assets/Pages/Login.jsx";
import ErrorPage from "./assets/Pages/ErrorPage.jsx";
import TermsConditions from "./assets/Pages/TermsConditions.jsx";
import PaymentAError from "./assets/Pages/PaymentAError.jsx";
import Fulldetails from "./assets/Pages/Details/Fulldetails.jsx";
import AllCategory from "./assets/Pages/AllCategory.jsx";
import OrderPage from "./assets/Pages/OrderPage.jsx";
import ProductSearchPage from "./assets/Pages/ProductSearchPage.jsx";

import AuthContextProvider from "./context/AuthContextProvider.jsx";
import CartContextProvider from "./context/CartContextProvider.jsx";
import CheckoutContextProvider from "./context/CheckoutContextProvider.jsx";
import OrderContextProvider from "./context/OrderContextProvider.jsx";
import CommonContextProvider from "./context/CommonContextProvider.jsx";

import AdminLayout from "./assets/Component/Admin/AdminLayout.jsx";
import AdminHomePage from "./assets/Pages/AdminHomePage.jsx";
import UserManagement from "./assets/Component/Admin/UserManagement.jsx";
import ProductManagement from "./assets/Component/Admin/ProductManagement.jsx";
import EditProductPage from "./assets/Pages/EditProductPage.jsx";
import OrderManagement from "./assets/Pages/OrderManagement.jsx";
import EditCategory from "./assets/Pages/EditCategory.jsx";
import CategoryManagement from "./assets/Component/Admin/CategoryManagement.jsx";
import AddCategory from "./assets/Pages/AddCategory.jsx";
import AddProductPage from "./assets/Pages/Home/AddProductPage.jsx";
import MyProfilePage from "./assets/Pages/MyProfilePage.jsx";
import OrderDetails from "./assets/Pages/OrderDetails.jsx";
import Invoice from "./assets/Component/Invoice.jsx";
import ProtectedRoute from "./assets/Component/ProtectedRoute.jsx";
import AdminContextProvider from "./context/AdminContextProvider.jsx";
import AdminOrderContextProvider from "./context/AdminOrderContextProvider.jsx";
import BannerManagement from "./assets/Component/Admin/BannerManagement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-confirmation",
        element: <Confirm />,
      },
      {
        path: "/product/:id",
        element: <Fulldetails />, //* ProductDetails
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/terms-conditon",
        element: <TermsConditions />,
      },
      {
        path: "/paymenterror",
        element: <PaymentAError />,
      },
      {
        path: "/category/:categoryId",
        element: <AllCategory />,
      },
      {
        path: "/search-products",
        element: <ProductSearchPage />, //* Product card using category query
      },
      {
        path: "/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/myprofile",
        element: <MyProfilePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminHomePage />,
      },
      {
        path: "/admin/users",
        element: <UserManagement />,
      },
      {
        path: "/admin/products",
        element: <ProductManagement />,
      },
      {
        path: "/admin/banners",
        element: <BannerManagement />,
      },
      {
        path: "/admin/products/add",
        element: <AddProductPage />,
      },
      {
        path: "/admin/products/:id/edit",
        element: <EditProductPage />,
      },
      {
        path: "/admin/orders",
        element: <OrderManagement />,
      },
      {
        path: "/admin/category",
        element: <CategoryManagement />,
      },
      {
        path: "/admin/category/add",
        element: <AddCategory />,
      },
      {
        path: "/admin/category/:id/edit",
        element: <EditCategory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CommonContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <CheckoutContextProvider>
              <AdminContextProvider>
                <AdminOrderContextProvider>
                  <RouterProvider router={router} />
                </AdminOrderContextProvider>
              </AdminContextProvider>
            </CheckoutContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </CommonContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
