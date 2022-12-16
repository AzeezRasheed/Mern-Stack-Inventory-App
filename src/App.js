import React, { useEffect } from "react";
import Sidenav from "./components/Sidebar/Sidenav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./page/auth/ForgotPassword";
import Reset from "./page/auth/Reset";
import Dashboard from "./page/dashboard/Dashboard";
import EditProduct from "./page/editProduct/EditProduct";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import Home from "./page/Home/Home";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/auth/authSlice";
import AddProduct from "./page/addProduct/AddProduct";
import Profile from "./page/profile/Profile";
import Contact from "./page/contact/Contact";
import EditProfile from "./page/editProfile/EditProfile";
import axios from "axios";
import ProductDetail from "./page/productDetail/productDetail";
import Logout from "./components/logout/logout";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidenav>
            <Logout>
            <Dashboard />
            </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidenav>
              <Logout>
              <AddProduct />
              </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidenav>
              <Logout>
              <ProductDetail />
              </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidenav>
            <Logout>
            <EditProduct />
            </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidenav>
             <Logout>
             <Profile />
             </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidenav>
             <Logout>
             <EditProfile />
             </Logout>
            </Sidenav>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidenav>
             <Logout>
             <Contact />
             </Logout>
            </Sidenav>
          }
        />
      </Routes>
    </>
  );
}

export default App;
