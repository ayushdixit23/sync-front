// Import necessary libraries and assets
"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decryptaes, encryptaes } from "@/app/security";
import Cookies from "js-cookie";
import { userData } from "@/lib/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { API } from "@/utils/Essentials";
import { useAuthContext } from "@/utils/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import firebase from "../../../firebase";

// // Define the functional component
function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState({
    access_token: "",
    refresh_token: "",
  });
  const [email, setEmail] = useState("devanshi@gmail.com"); // State for email input
  const [password, setPassword] = useState("12345678"); // State for password input
  const [organization, setOrganization] = useState([]);
  const { setData } = useAuthContext();
  const [load, setLoad] = useState(false);

  const [popup, setPopup] = useState(false);

  const checklogin = async () => {
    try {
      setLoad(true);

      const response = await axios.post(`${API}/signin`, {
        email: email,
        pass: password,
        // org: organization,
      });

      if (response.data.success) {
        const details = response.data.user;

        if (response.data.organistions.length > 0) {
          setPopup(true);
          setOrganization(response.data.organistions);
          setData(response.data.data);
          setToken({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          });
          dispatch(
            userData({
              id: details._id,
              organization: details.organization,
              email: details.email,
            })
          );
        } else {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          setData(response.data.data);
          Cookies.set("nexo-data-1", response.data?.access_token, {
            expires: expirationDate,
          });
          Cookies.set("nexo-data-2", response.data?.refresh_token, {
            expires: expirationDate,
          });

          router.push("../side/todo");
        }
      } else {
        router.push("../main/signup");
      }
    } catch (e) {
      console.log("get llll");
      console.error("Error logging in", e.message);
    }
    setLoad(false);
  };

  const cookieSetter = async (id, title) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      Cookies.set("nexo-data-1", token.access_token, {
        expires: expirationDate,
      });
      Cookies.set("nexo-data-2", token.refresh_token, {
        expires: expirationDate,
      });

      localStorage.setItem("orgid", id);
      localStorage.setItem("orgtitle", title);
      router.push("../side/todo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {popup && (
        <div className="flex justify-center items-center h-screen fixed inset-0  w-full">
          <div id="default-modal" tabindex="-1" aria-hidden="true" class=" ">
            <div class="relative p-4 w-full max-w-xl max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h3>
                  <button
                    onClick={() => setPopup(false)}
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div class="p-4 md:p-5 space-y-4">
                  {organization.map((d) => (
                    <div className="flex justify-between items-center px-3">
                      <div>{d?.title}</div>
                      <div onClick={() => cookieSetter(d?._id, d?.title)}>
                        Join
                      </div>
                    </div>
                  ))}
                </div>

                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-screen font-sans h-screen bg-[#f9f9f9] sm:bg-[#FFC977] flex justify-center items-center">
        <div className="flex flex-row w-[80%] h-[80%] bg-white p-2 items-center justify-between rounded-3xl max-lg:justify-center">
          <div className="w-[50%] h-full flex items-center justify-center">
            <Image
              src={bgg}
              priority={true}
              alt="pic"
              className="pn:max-vs:hidden object-contain w-[600px] h-[600px]"
            />
          </div>
          <div className="h-[100%] w-[300px] vs:w-[400px] rounded-3xl bg-[#f9f9f9] flex flex-col justify-evenly items-center p-2">
            <div>
              <div className="text-[#3e3e3e] text-[24px] font-bold">Login!</div>
              <div className="h-[50px] w-[350px] items-center flex justify-between">
                <div className="text-[#3e3e3e] text-[20px] font-bold">
                  Welcome to Nexoo
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="text-[14px] font-medium text-[#8D8D8D]">
                  New user ? Sign up today for exclusive access and benefits.
                </div>
                <Link
                  href={"/main/signup"}
                  className="text-[#ffbf67] hover:underline font-semibold text-[14px]"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>

            {/* Enter your details */}
            <div className="h-[210px]  flex flex-col justify-between">
              {/* Organization name */}
              {/*  <div>
              <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                Organization
              </div>
              <input
                placeholder="Organization name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
              />
            </div>*/}
              {/* Email */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                  Enter your email address
                </div>
                <input
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              {/* Password */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                  Enter your password
                </div>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              <div className="flex h-[40px] items-start w-[350px] justify-end">
                <div className="text-[#AD3113] text-[14px]">
                  Forgot Password?
                </div>
              </div>
            </div>

            {/* Sign In */}
            {load ? (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              <button
                onClick={checklogin}
                className="bg-[#e0a54c] hover:bg-[#E48700] text-white font-bold text-[14px] flex justify-center items-center rounded-full py-2 shadow-lg w-[240px]"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
