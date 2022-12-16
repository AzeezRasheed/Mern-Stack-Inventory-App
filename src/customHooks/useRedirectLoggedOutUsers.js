import React, { useEffect } from "react";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";



const useRedirectLoggedOutUsers = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function loginStatus() {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info("Session expired, please login");
        navigate(path);
      }
    }

    loginStatus();
  }, [dispatch, navigate, path]);
};

export default useRedirectLoggedOutUsers;
