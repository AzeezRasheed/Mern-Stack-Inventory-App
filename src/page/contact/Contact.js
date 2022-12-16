import React from "react";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";
import { useState } from "react";

function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={sendEmail} className="flex flex-col  gap-2  ">
      <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
        Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="flex w-full flex-col gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
          <p className=" capitalize text-gray-500  tracking-wid font-bold text-lg flex-shrink-0 py-1 px-2  ">
            Subject
          </p>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="appearance-none block w-full  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          <p className=" capitalize text-gray-500  tracking-wid font-bold text-lg flex-shrink-0 py-1 px-2  ">
            Message
          </p>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            cols="30"
            rows="10"
            placeholder="Your Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="flex-shrink-0 max-w-[150px] m-auto lg:m-0 bg-blue-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Send Message
          </button>
        </div>
        <div className="flex w-full pt-6 pb-10 flex-col gap-6 shadow-lg shadow-indigo-500/50 bg-blue-500 p-2 lg:p-4 lg:h-[300px]">
          <div className="flex flex-col gap-4">
            <h2 className="capitalize text-white text-[18px] text-center lg:text-start md:text-[25px] md:text-start lg:text-[25px] font-bold font-sans leading-[20px] ">
              Our contact information
            </h2>
            <p className="text-white">
              Fill the form or contact us via other channels listed below{" "}
            </p>
          </div>
          <div>
            <div className="icons text-white flex flex-col gap-2  ">
              <span className="flex flex-row gap-2 items-center ">
                <FaPhoneAlt />
                <p>07036874722</p>
              </span>
              <span className="flex flex-row gap-2 items-center ">
                <FaEnvelope />
                <p>rayshmanazeez@gmail.com</p>
              </span>
              <span className="flex flex-row gap-2 items-center ">
                <GoLocation />
                <p>Lagos, Nigeria</p>
              </span>
              <span className="flex flex-row gap-2 items-center ">
                <FaTwitter />
                <p>@Abdulazeez Abdulrasheed</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Contact;
