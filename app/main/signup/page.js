"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/lib/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "@/utils/Essentials";
import { setEmail, setImage, setName, setPassword } from "@/lib/signupSlice";


function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email)
  const password = useSelector((state) => state.signup.password)
  const image = useSelector((state) => state.signup.image)
  const fullname = useSelector((state) => state.signup.name)
  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("fullname", fullname)
      formData.append("password", password)
      formData.append("dp", image)
      const response = await axios.post(`${API}/signup`, formData);
      if (response.status === 200) {
        router.push("../main/signedup");
      } else {
        console.log("User unable to signup");
      }

      // dispatch(
      //   userData({ id: response.data._id, orgname: orgname, email: email })
      // );
      //  console.log("User created:", response.data);

      // router.push("../side/todo");
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  // Select file

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {

      //const imageUrl = await convertImageToDataURL(file);
      dispatch(setImage(file))
    }
  };
  const func = async () => {
    try {
      const mail = await validateEmail(email);

      // if (mail && password.length > 6 && fullname && image) {

      //   const formdata = new FormData();
      //   formdata.append("dp", image);
      //   formdata.append("email", email);
      //   formdata.append("username", fullname);
      //   formdata.append("password", password);
      //   console.log("done");

      //   const response = await axios.post(`${API}/signup`, formdata);
      //   console.log(response?.data, "res");
      //   if (response.status === 200) {
      //     localStorage.setItem('email', email),
      //       router.push("../main/signedup");
      //   }
      // } else {
      //   if (password.length <= 6) {
      //     toast.error("Enter password more than 7 letters");
      //   } else {
      //     toast.error(
      //       "Incorrect details",
      //       mail && password.length > 6 && image && fullname
      //     );
      //   }
      // }

      router.push("/main/signedup")
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="w-screen font-sans h-screen bg-[#f9f9f9] sm:bg-[#FFC977] flex justify-center items-center">
      <ToastContainer />
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
            <div className="text-[#3e3e3e] text-[24px] font-bold">Sign Up</div>
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
                href={"/main/signin"}
                className="text-[#ffbf67] hover:underline font-semibold text-[14px]"
              >
                Sign In
              </Link>
            </div>

            {/* Upload picture */}
            {/* <div className="w-[100%] flex justify-center 0 items-center flex-col">
              <img src={imageUrl} className="h-10 w-10  rounded-full" />
              <input
                type="file"
                onChange={handleFileChange}
                className="h-12 w-[100%] rounded-full mt-2"
              ></input>
              <div  className="text-[12px] mt-2">Upload profile picture</div>
            </div> */}
            <div className="w-full  flex flex-col  justify-center items-center">
              <label className="relative flex items-center flex-col">
                <img
                  src={image ? URL.createObjectURL(image) : "/placeholder-image.png"}
                  alt="Choose"
                  className="rounded-full text-[8px] bg-gray-200 h-[50px] w-[50px]"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer h-12 w-full rounded-full"
                />
                {!image ? (
                  <div className="mt-2 text-[10px] text-black">Upload</div>
                ) : (
                  <div className="mt-2 text-[10px] text-black">{image.name}</div>
                )}
                {/* <div className="text-sm mt-2">{imge}</div> */}
              </label>
              {image && (
                <button
                  className="mt-1 text-[10px] underline text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => {
                    dispatch(setImage(""))
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="h-[200px] flex flex-col justify-evenly">
              {/* Enter your username or email address */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Email address
                </div>
                <input
                  value={email}
                  onChange={(e) => {
                    dispatch(setEmail(e.target.value));
                  }}
                  placeholder="Enter your email address"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              {/* user and contact */}
              {/* <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Username
                </div>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your username"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div> */}

              {/* password */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Password
                </div>
                <input
                  value={password}
                  onChange={(e) => {
                    dispatch(setPassword(e.target.value));
                  }}
                  placeholder="Enter your Password"
                  type="password"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              {/* Full name */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Full Name
                </div>
                <input
                  value={fullname}
                  onChange={(e) => {
                    dispatch(setName(e.target.value));
                  }}
                  placeholder="Enter your full name"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
            </div>
            {/* Next page */}
            {/* <Link
              className="bg-[#ffc061] hover:bg-[#E48700] mt-8 text-white font-bold text-[16px] flex justify-center items-center rounded-full py-3 shadow-lg w-[350px]"
              href={{
                pathname: "../main/signedup",
                query: {
                  email,
                  fullname,
                  password,
                  // image: encodeURIComponent(imageUrl),
                },
              }}
            >
              Continue
            </Link> */}
            <div
              onClick={func}
              className="bg-[#ffc061] hover:bg-[#E48700] mt-8 text-white font-bold text-[16px] flex justify-center items-center rounded-full py-3 shadow-lg w-[350px]"
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
