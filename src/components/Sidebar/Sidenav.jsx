import menu from "../../data/sidebar";
import SidenavHeader from "./SidenavHeader";
import { RiProductHuntLine } from "react-icons/ri";
import "./SideNav.css";
import SidenavMenu from "./SideNavMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_INPUT_BOOLEAN } from "../../redux/inputBoolean/inputBooleanSlice";

const Sidenav = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputBoolean, setInputBoolean] = useState(false);
  const goHome = () => {
    navigate("/");
  };
  useEffect(() => {
    dispatch(SET_INPUT_BOOLEAN(inputBoolean));
  }, [inputBoolean]);

  return (
    <div className="relative min-h-screen md:flex " data-dev-hint="container">
      <input
        type="checkbox"
        id="menu-open"
        className="hidden"
        onClick={() => {
          setInputBoolean(!inputBoolean);
        }}
      />
      <label
        htmlFor="menu-open"
        className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
        data-dev-hint="floating action button"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>

      <SidenavHeader />
      <aside
        id="sidebar"
        className="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col p-2 space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >

  <div className="flex flex-row justify-between p-3 w-[240px] ">
            <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
            <span className="text-2xl pl-4 font-extrabold whitespace-nowrap truncate">
              Inventory App
            </span>
          </div>

          {menu.map((item, index) => {
            return <SidenavMenu key={index} item={item} />;
          })}
        </div>
      </aside>

      <main id="content" className="flex-1 lg:px-8 pl-2 pr-2">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Sidenav;
