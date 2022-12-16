import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/authService";
import Spinner from "../../components/spinnerModal/Spinner";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("New passwords do not match");
    }

    const formData = {
      password,
      oldPassword,
    };

    setIsLoading(true);
    try {
      const data = await changePassword(formData);
      setIsLoading(false);
      toast.success(data);
      console.log(data);
      console.log(formData);
      navigate("/profile");
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <form onSubmit={changePass} className="flex flex-col gap-2 max-w-[400px]">
        <input
          type="password"
          placeholder="Old Password"
          required
          name="oldPassword"
          value={oldPassword}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <input
          type="password"
          placeholder="New Password"
          required
          name="password"
          value={password}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          name="password2"
          value={password2}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <button
          type="submit"
          className="flex-shrink-0 max-w-[150px] m-auto lg:m-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
