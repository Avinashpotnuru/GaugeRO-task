// import { Inter } from "next/font/google";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });
import LoginPage from "./login";
import { useDispatch, useSelector } from "react-redux";
import { loginStatusHandler } from "../store/slices/loginSlice";
import ConformationPage from "./conformation";

export default function Home() {
  const router = useRouter();
  const isAuth = useSelector((state) => state.loginSlice.loginStatus.status);

  console.log("isAuth", isAuth);
  useEffect(() => {
    if (isAuth) {
      router.replace("/login");
    }
  }, [isAuth]);

  return (
    <div className="bg-[rgb(27,27,27)]">
      <ConformationPage />
    </div>
  );
}
