import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../components/changePassword/changePassword";
import Spinner from "../../components/spinnerModal/Spinner";
import useRedirectLoggedOutUsers from "../../customHooks/useRedirectLoggedOutUsers";
import { selectUser } from "../../redux/auth/authSlice";
import { updateUser } from "../../services/authService";

function EditProfile() {
  useRedirectLoggedOutUsers("/login");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "ddxbfc1op");
        image.append("upload_preset", "ml_default");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddxbfc1op/upload",
          {
            method: "post",
            body: image,
          }
        );
        const imgData = await response.json();
        imageURL = imgData.url?.toString();

        console.log(imgData);
        console.log(imgData.url?.toString());

        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={saveProfile}
        className="flex flex-col lg:flex-row max-w-[700px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4"
      >
        {isLoading && <Spinner />}
        <div className="flex flex-col gap-2 lg:w-96 ">
          <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
            Edit Profile
          </h2>
          {user?.photo && (
            <div className="image-preview transition flex items-center justify-center md:items-center md:justify-center lg:items-start lg:justify-start flex-wrap  py-3 mb-3 ">
              <img
                src={user?.photo}
                alt="profile"
                className="max-w-full h-auto  shadow-lg"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 p-2 lg:p-4">
          <hr className="text-[4px] font-bold  " />
          <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 md:gap-3 lg:gap-3 items-center lg:text-center md:text-center ">
            <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
              Name :
            </label>
            <input
              type="text"
              placeholder="John Doe"
              name="name"
              value={profile?.name}
              onChange={handleInputChange}
              className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <hr className="text-[4px] font-bold  " />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
              <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
                Email :
              </label>
              <input
                type="text"
                placeholder={profile?.email}
                name="email"
                disabled
                // value={product?.name}
                // onChange={handleInputChange}
                className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <code className="text-center">Email cannot be changed</code>
          </div>
          <hr className="text-[4px] font-bold  " />
          <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
            <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
              Phone :
            </label>
            <input
              type="text"
              placeholder="Your phone number"
              name="phone"
              value={profile?.phone}
              onChange={handleInputChange}
              className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <hr className="text-[4px] font-bold  " />
          <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 lg:gap-10 md:gap-10 items-center lg:text-center md:text-center ">
            <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
              Bio :
            </label>
            <textarea
              className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your Bio"
              name="bio"
              value={profile?.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 ">
            <code className="text-center">
              Supported Formats: jpg, jpeg, png
            </code>
            <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2  items-center lg:text-center md:text-center ">
              <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
                Photo :
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
                className="appearance-none max-w-lg block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex-shrink-0 max-w-[150px] m-auto lg:m-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div className=" flex flex-col gap-3 border border-solid border-red-500 max-w-[410px] p-2 ">
        <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
          Change Password
        </h2>
        <ChangePassword />
      </div>
    </div>
  );
}

export default EditProfile;
