"use client";
import Loader from "@/app/Loader";
import { decryptaes } from "@/app/security";
import { useAuthContext } from "@/utils/auth";
import { API } from "@/utils/Essentials";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function page() {
  // const cookie = Cookies.get("she2202");
  // const cook = decryptaes(cookie);
  // const d = JSON.parse(cook);
  const { data, setAuth, setData } = useAuthContext();

  const router = useRouter();
  const id = data.id;
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prevdetails, setPrevdetails] = useState();
  const [loggout, setLoggout] = useState(false);
  const [clicklog, setClicklog] = useState(0);
  const [option, setOption] = useState(0);
  const userdata = async () => {
    try {
      const response = await axios.get(`${API}/getuserdata/${id}`);
      const dataa = response.data;
      setPrevdetails(response.data);
      setName(dataa?.user?.name);
      setRole(dataa?.user?.jobrole);
      setEmail(dataa?.user?.email);
      setPassword(dataa?.user?.password);
      // const userid = dataa.find((e) => e._id === d._id);
      // if (userid) {
      //   setName(userid.username);
      // } else {
      //   console.log("Not getting user");
      // }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };

  const logout = () => {
    // Clear cookie
    Cookies.remove("nexo-data-1");
    Cookies.remove("nexo-data-2");
    // Reset state
    setAuth(false);
    setData("");
    router.push("/main/signin");
    // Redirect to login page (replace with your routing logic)
    //window.location.href = "/login"; // or use history.push('/login') if using React Router
  };
  useEffect(() => {
    if (id) {
      userdata();
    }
  }, [id]);

  // logout function
  const handleLogout = () => {
    logout();
    // Redirect to login page
  };
  const editdetails = async () => {
    try {
      setLoad(true);
      const response = await axios.post(`${API}/updatedetails`, {
        id: id,
        email: email,
        password: password,
        role: role,
        name: name,
      });

      console.log(response.data);
    } catch (e) {
      console.error("No User found", e.message);
    }
    setLoad(false);
  };
  return (
    <div className="h-full w-full sm:pt-1 sm:px-4">
      <div className="w-full py-4 pl-4 rounded-2xl pn:max-sm:hidden font-semibold text-[16px] bg-white ">
        Account Settings
      </div>
      <div className="sm:mt-2 w-full h-[100%] sm:h-[90%] sm:rounded-2xl flex space-x-2">
        {/* web-left */}
        <div className="h-full sm:w-[25%] w-[100%] bg-white sm:rounded-2xl p-2">
          <div className="w-full bg-[#f9f9f9] h-[100px] sm:h-[200px] rounded-2xl sm:flex-col flex items-center sm:justify-center px-2 space-x-2">
            <div className="h-[65px] w-[65px] bg-[#fff] rounded-full"></div>
            <div>
              <div className="font-semibold text-[16px] mt-5">{name}</div>
              {/* <div className="font-medium text-[14px] text-[#4b4b4b]">
                @Username
              </div> */}
            </div>
          </div>
          <div
            className={`flex justify-between
           px-1 h-[50px] items-center border-b-[1px] ${
             option === 0 ? "bg-[#fafafa]" : "bg-[#fff]"
           } hover:bg-[#fafafa] hover:rounded-lg border-[#f1f1f1] mt-2`}
          >
            <div className="font-medium text-[#3e3e3e]">Edit profile</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          {/* <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] hover:rounded-lg border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">Notifications</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">All My task</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">My Storage</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div> */}

          {/* <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">Privacy & Security</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">T&C</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div> */}
          <div
            onClick={() => {
              setLoggout(true);
            }}
            className="flex justify-between px-2 h-[50px] items-center hover:bg-[#fafafa] "
          >
            <div className="font-medium text-red-500">Log out</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        {/* web-right */}
        <div className="h-full w-[75%] pn:max-sm:hidden bg-white rounded-2xl flex flex-col items-center justify-center">
          {/* dp */}
          <div className="w-full h-[100px] mt-2 flex items-center justify-center flex-col">
            <div className="h-[60px] w-[60px] rounded-full bg-gray-100 mb-4"></div>
            <div className="font-medium text-blue-500">Update Profile</div>
          </div>
          <div className="h-full w-full mt-4 ">
            {/* name */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">Name</div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your full name"
              />
            </div>
            {/* username */}
            {/* <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Username
              </div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="enter your username"
              />
            </div> */}
            {/* email */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                E-mail
              </div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="@ e-mail"
              />
            </div>
            {/* password */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Password
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="Enter your Password"
              />
            </div>
            {/* job role */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Job role
              </div>
              <input
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="Enter you jobrole"
              />
            </div>

            <div className="flex mt-2  w-[80%] justify-end">
              <div className="bg-[#F1F2F3] p-2 rounded-md font-semibold text-[12px] justify-center items-center flex">
                Cancel
              </div>
              <div
                onClick={() => {
                  if (
                    prevdetails?.user?.name != name ||
                    prevdetails?.user?.email != email ||
                    prevdetails?.user?.jobrole != role ||
                    prevdetails?.user?.password != password
                  ) {
                    editdetails();
                  }
                }}
                className={`p-2 text-white ${
                  prevdetails?.user?.name === name &&
                  prevdetails?.user?.email === email &&
                  prevdetails?.user?.jobrole === role &&
                  prevdetails?.user?.password === password
                    ? "bg-[#ffdead]"
                    : "bg-[#FFC977] "
                }  rounded-md font-semibold text-[12px] ml-4`}
              >
                {load ? (
                  <div className="animate-spin">
                    <AiOutlineLoading3Quarters />
                  </div>
                ) : (
                  "Save Changes"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loggout && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-2 py-4 rounded-xl">
            <div className="flex flex-rowvw-[100%] justify-center ">
              <div className="text-black text-[16px] font-semibold w-[100%] px-2">
                Are you sure you want to logout?
              </div>
              {/* <RxCross2
                onClick={() => setLogout(false)}
                color="#000"
                size={15}
                className="w-[10%] "
              /> */}
            </div>

            <div className=" mt-4 w-[100%]  rounded-xl items-center justify-evenly flex">
              <div
                onClick={() => {
                  setClicklog(0);
                  setLoggout(false);
                }}
                className={`text-[#000] ${
                  clicklog === 0 ? "bg-[#e5e5e5]" : "bg-white"
                } bg-[#e5e5e5] hover:bg-[#f2f2f2] px-4 py-2 rounded-xl  text-[14px]`}
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  setClicklog(1);
                  handleLogout();
                }}
                className={`text-red-600 ${
                  clicklog === 1 ? "bg-[#e5e5e5]" : "bg-white"
                } hover:bg-[#f2f2f2] px-4 py-2 rounded-xl text-[14px]`}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
