import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import LoginPage from "./login";
import { loginStatusHandler } from "@/store/slices/loginSlice";

const ConformationPage = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(30);
  const [button, setButton] = useState(false);
  const [otp, setOTP] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const mobNumber = useSelector(
    (state) => state.loginSlice.loginStatus.helperData
  );
  const auth = useSelector((state) => state.loginSlice.loginStatus.status);
  // console.log(auth);

  // console.log("mobNumber", mobNumber);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(interval);
        setButton(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);
  const getOTP = async () => {
    try {
      const response = await axios.post(
        "http://194.163.150.186:5000/customer/auth/send-otp",
        { countryCode: "+91", mobileNumber: mobNumber }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOTP = async () => {
    console.log({ countryCode: "+91", mobileNumber: mobNumber, otp: otp });
    try {
      const response = await axios.post(
        "http://194.163.150.186:5000/customer/auth/verify-otp",
        {
          countryCode: "+91",
          mobileNumber: mobNumber,
          otp: otp,
        }
      );
      if (response.status) {
        router.push("/instructions");
        dispatch(loginStatusHandler());
        setButton(true);
      }

      console.log("RES", response);
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setOTP(`${input1}${input2}${input3}${input4}`);
    if (input1 && input2 && input3 && input3) {
      if (otp && mobNumber) {
        !button ? verifyOTP() : getOTP();
      }
      setErr("");
    } else {
      setErr("enter all otp digits");
    }

    // console.log(otp);
  };

  useEffect(() => {
    if (auth) {
      router.replace("/login");
    }
  }, [auth]);

  return (
    <div className="bg-[rgb(27,27,27)] m-auto w-screen h-screen md:w-[40%] p-7 ">
      <h1 className="text-white">Enter the OTP sent to</h1>
      <div className="text-white font-bold">{mobNumber}</div>
      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col  justify-start items-center  my-6 "
      >
        <div>
          <input
            onChange={(e) => setInput1(e.target.value)}
            value={input1}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center border border-gray-300 rounded-lg mx-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            onChange={(e) => setInput2(e.target.value)}
            value={input2}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center border border-gray-300 rounded-lg mx-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            onChange={(e) => setInput3(e.target.value)}
            value={input3}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center border border-gray-300 rounded-lg mx-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            onChange={(e) => setInput4(e.target.value)}
            value={input4}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center border border-gray-300 rounded-lg mx-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <br />
        {!button && <h1 className="text-white">{`${count} sec`}</h1>}

        <div className="flex justify-start  w-full">
          {!button ? (
            <button
              type="submit"
              className="bg-transparent border-2 border-white text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              Conform
            </button>
          ) : (
            <button className="bg-transparent  border-2 border-white text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Resend
            </button>
          )}
        </div>
        {err && <h1 className="text-red-400 py-2">{err}</h1>}
      </form>
    </div>
  );
};

export default ConformationPage;
