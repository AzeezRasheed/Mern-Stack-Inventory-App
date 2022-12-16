import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/hiddenLink";
import heroImg from "../../assets/inv-img.png";

function Home() {
  return (
    <div className="bg-blue-900 min-h-screen pl-4 pr-4 lg:pl-8 lg:pr-8  md:pl-8 md:pr-8  ">
      <nav className="flex flex-row justify-between pt-[1.5rem] pb-[1.5rem]  text-white lg:pl-20 lg:pr-20 ">
        <div className="logo text-white ">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="flex flex-row gap-2 items-center">
          <ShowOnLogout>
            <li className="text-white">
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li className="text-white border border-solid border-transparent  text-center text-[14px] group relative flex justify-center rounded-md py-2 px-4 bg-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
              <Link to="/login">Login</Link>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li className="text-white">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>

      <section className="flex flex-col justify-center items-center pt-4 lg:pt-14 lg:flex-row md:flex-col ">
        <div className="hero-text  text-white mb-[2rem]  ">
          <h2 className="text-center text-[20px] w-screen block w- pl-2 pr-2 font-semi-bold font-serif leading-8 lg:w-[250px] pb-4 lg:text-start lg:text-[28px] lg:pl-0 lg:pr-0 md:text-[24px] ">
            Inventory {"&"} Stock Management Solution
          </h2>
          <p className=" lg:w-[420px] text-center lg:text-start text-[12px]  p-2 lg:p-0 lg:text-[18px] leading-5 md:text-[14px] md:pl-20 md:pr-20 ">
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons pt-6 pb-6 flex items-center justify-center lg:justify-start lg:items-start ">
            <button className="border border-solid border-white hover:border-indigo-700  text-center text-[14px] group relative flex justify-center rounded-md py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="flex items-center justify-center lg:justify-start lg:items-start ">
            <div className="flex flex-row justify-between pl-2 pr-2 text-start font-semi-bold text-sm w-[320px] lg:text-xl lg:w-[350px] ">
              <NumberText num="14K" text="Brand Owners" />
              <NumberText num="23K" text="Active Users" />
              <NumberText num="500+" text="Partners" />
            </div>
          </div>
        </div>
        <div className="hero-image items-center p-0 ">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
}

export default Home;

const NumberText = ({ num, text }) => (
  <>
    <div>
      <h3>{num}</h3>
      <p>{text}</p>
    </div>
  </>
);
