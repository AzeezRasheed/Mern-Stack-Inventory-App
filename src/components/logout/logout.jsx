import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName } from "../../redux/auth/authSlice";
import { logoutUser, getLoginStatus } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../../redux/auth/authSlice";
function Logout({ children }) {
  const dispatch = useDispatch();
  const username = useSelector(selectName);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("name");
    await logoutUser();
    const status = await getLoginStatus();
    dispatch(SET_LOGIN(status));
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 text-center items-center">
            <h2 className=" text-[18px] lg:text-[28px] md:text-[24px] text-slate-500 leading-[10px]">
              Welcome,
            </h2>
            <h2 className="text-[18px] lg:text-[28px] md:text-[24px] text-red-500 font-bold leading-[10px]">
              {username}
            </h2>
          </div>
          <button
            onClick={() => logout()}
            className="flex-shrink-0  lg:m-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Logout
          </button>
        </div>
        <hr className="border-4 border-blue-500 cursor-pointer hover:border-red-500 duration-500" />
      </div>
      {children}
    </div>
  );
}

export default Logout;
