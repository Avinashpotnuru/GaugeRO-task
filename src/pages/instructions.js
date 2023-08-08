import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Instructions = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.loginSlice.loginStatus.status);
  useEffect(() => {
    if (auth) {
      router.replace("/login");
    }
  }, [auth]);

  return (
    <div className="bg-[rgb(27,27,27)] w-screen h-screen p-7 flex flex-col justify-center items-center md:w-[40%] m-auto">
      <Image
        className="mb-5"
        height={100}
        width={100}
        src="/messages.jpg"
        alt="msg"
      />
      <div className="border-2 border-white p-4 rounded-md">
        <h1 className="text-sky-400">
          Before Connecting to wifi we advice to you
        </h1>
        <ul className="list-decimal text-white px-4 space-y-2">
          <li>Connect to the wifi with 2.4 GHZ</li>
          <li>Place your phone near the Water purifier</li>
          <li>
            If the network connection is weak then choose the wifi network with
            a better signal strength
          </li>
        </ul>
      </div>
      <div className="w-full">
        <button className="bg-blue-500 hover:bg-blue-600 my-5 text-white font-semibold  w-full py-2 px-4 rounded-lg shadow-md">
          Okay
        </button>
      </div>
    </div>
  );
};

export default Instructions;
