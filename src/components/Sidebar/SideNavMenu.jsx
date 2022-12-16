import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const activeSublink = ({ isActive }) => (isActive ? "active" : "link");

const SidenavMenu = ({ item }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  if (item.childrens) {
    return (
      <div>
        {/* <div class="my-4 bg-gray-600 h-[1px]"></div> */}
        <div
          className={`flex flex-row justify-between items-center gap-3 p-2.5 mt-3 rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white `}
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          {item.icon && <span className="icon">{item.icon}</span>}
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              {item.title}
            </span>
          </div>
          <MdKeyboardArrowRight
            size={25}
            className={`arrow-icon ${dropdown ? "rotate-0" : "rotate-90"} `}
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>
        <div className={`sidebar-content ${dropdown ? "hidden" : ""}`}>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child ">
                <NavLink to={child.path} className={activeSublink}>
                  <div
                    className="sidebar-item text-left text-sm mt-2 flex flex-col gap-4 mx-auto text-gray-200 font-bold"
                    id="submenu"
                  >
                    {child.icon && <div className="icon">{child.icon}</div>}
                    <span className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                      {child.title}
                    </span>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="space-y-2 sidebar-item s-parent flex flex-row justify-between items-center p-2.5 mt-3 rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ">
          <div className="sidebar-title">
            <span className="flex flex-row gap-3 items-center">
              {item.icon && <div className="icon">{item.icon}</div>}
              <div className="text-[15px] ml-4 text-gray-200 font-bold">
                {item.title}
              </div>
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};
export default SidenavMenu;
