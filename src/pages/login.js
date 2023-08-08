import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Image from "next/image";
import { BsTelephone } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";

import { loginStatusHandler } from "../store/slices/loginSlice";
import { useRouter } from "next/router";

import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [err, setError] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    const phoneNumberPattern = /^\d{10}$/;

    e.preventDefault();
    if (number) {
      setError("");

      if (phoneNumberPattern.test(number)) {
        setError("");
      } else {
        setError("Number must be 10 digits");
      }
    } else {
      setError("Number is Required");
    }

    if (number) {
      getOTP();
    }
  };

  const getOTP = async () => {
    try {
      const response = await axios.post(
        "http://194.163.150.186:5000/customer/auth/send-otp",
        { countryCode: "+91", mobileNumber: number }
      );

      console.log(response);

      if (response.status) {
        dispatch(loginStatusHandler(number));

        router.push("/conformation");
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setNumber("");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="bg-[rgb(27,27,27)] w-screen m-auto md:w-[40%] h-screen flex flex-col justify-around items-center px-5">
      <div className="flex  flex-col justify-center items-center space-y-1">
        <Image
          alt="image"
          className="h-[100px] w-[100px]"
          height={400}
          width={400}
          src="/tooth.webp"
        />
        <h1 className="text-[#a97451] font-normal text-[25px] ">Gauge.ro</h1>
        <h1 className="text-white font-medium ">Making Lives easier</h1>
      </div>
      <form onSubmit={submitHandler} className="w-full">
        <div className=" flex flex-col justify-start  ">
          <div className="text-white font-medium my-3 ">
            Enter Your Mobile Number
          </div>
          <div
            className={`flex  items-center  ${
              !err ? "border" : "border border-red-400 "
            } rounded-lg px-3 py-2 `}
          >
            <div>
              <svg
                className="w-6 h-6 text-gray-500 mr-2 mt-3 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <BsTelephone color="white" />
              </svg>
            </div>

            <input
              type="text"
              value={number}
              maxLength={10}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Mobile number"
              className="flex-grow bg-transparent outline-none text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 my-5 text-white font-semibold  py-2 px-4 rounded-lg shadow-md"
          >
            Sign In
          </button>

          {err && <p className="text-red-600">{err}</p>}
        </div>
      </form>

      <div className="">
        <h1 className="text-white">
          By signing up you agree to our{" "}
          <span className="text-sky-300">terms of service</span> and{" "}
          <span className="text-sky-300"> privacy policy</span>
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
