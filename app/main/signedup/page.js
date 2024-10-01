"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/lib/userSlice";
import { decryptaes, encryptaes } from "@/app/security";
import Cookies from "js-cookie";
import { API } from "@/utils/Essentials";
import { setOrganisationList } from "@/lib/signupSlice";
import { useAuthContext } from "@/utils/auth";
// import firebase from "../../../firebase";

function page() {
  const router = useRouter();
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const image = useSelector((state) => state.signup.image);
  const fullname = useSelector((state) => state.signup.name);
  const organisationlist = useSelector(
    (state) => state.signup.organisationlist
  );
  const dispatch = useDispatch();
  const [org, setOrg] = useState("");
  const { setData } = useAuthContext();
  const [orgid, setOrgid] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [join, setJoin] = useState(0);
  const [dp, setDp] = useState("");
  const [code, setCode] = useState("");
  const [popup, setPopup] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("fullname", fullname);
      formData.append("password", password);
      formData.append("profile", dp);
      formData.append("dp", image);
      formData.append("org", org);
      formData.append("inviteCode", code);
      const response = await axios.post(`${API}/signup`, formData);
      if (response.status === 200) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        Cookies.set("nexo-data-1", response.data?.access_token, {
          expires: expirationDate,
        });
        Cookies.set("nexo-data-2", response.data?.refresh_token, {
          expires: expirationDate,
        });

        setData(data?.data);

        localStorage.setItem("orgid", response.data?.orgId);
        localStorage.setItem("orgtitle", org);
        router.push("../side/todo");
      } else {
        console.log("User unable to signup");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const generatecode = async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Character set
    let code = "";

    // Generate a 17-character long code
    for (let i = 0; i < 17; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    // Set the generated code
    setCode(code);
  };

  useEffect(() => {
    generatecode();
  }, []);

  const cookieSetter = async (data) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      Cookies.set("nexo-data-1", data?.access_token, {
        expires: expirationDate,
      });
      Cookies.set("nexo-data-2", data?.refresh_token, {
        expires: expirationDate,
      });

      setData(data?.data);

      localStorage.setItem("orgid", orgid);
      localStorage.setItem("orgtitle", org);
      router.push("../side/todo");
    } catch (error) {
      console.log(error);
    }
  };

  const signupAsIndividual = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("fullname", fullname);
      formData.append("password", password);
      formData.append("dp", image);

      const response = await axios.post(`${API}/signupind`, formData);
      if (response.status === 200) {
        await cookieSetter(response.data);
      } else {
        console.log("User unable to signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signedupWithJoinOrgansition = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("fullname", fullname);
      formData.append("password", password);
      formData.append("dp", image);
      formData.append("org", org);
      formData.append("orgid", orgid);
      const response = await axios.post(`${API}/signup`, formData);
      if (response.status === 200) {
        await cookieSetter(response.data);
      } else {
        console.log("User unable to signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrg = async () => {
    try {
      const res = await axios.get(`${API}/fetchAllOrganisation`);
      dispatch(setOrganisationList(res.data?.organization));
      dispatch(setUrl(res.data?.url));
    } catch (error) {
      console.log(error);
    }
  };

  const checkInviteCode = async () => {
    try {
      const res = await axios.post(`${API}/checkInviteCode/${orgid}`, {
        code: inviteCode,
      });
      if (res.data.success) {
        if (res.data.isMatched) {
          signedupWithJoinOrgansition();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      //const imageUrl = await convertImageToDataURL(file);
      setDp(file);
    }
  };

  // useEffect(() => {
  //   // Check if any of the fields are missing
  //   if (!email || !password || !image || !fullname) {
  //     // Redirect to the signup page
  //     router.back()
  //   }
  // }, [email, password, image, fullname,]);

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
                  <div>Invite code</div>

                  <input
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Organization's name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>

                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={checkInviteCode}
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

      <div className="w-screen font-sans h-screen bg-[#FFC977] flex justify-center items-center">
        <div className="flex flex-row w-[80%] h-[80%] items-center justify-between max-lg:justify-center">
          <Image
            src={bgg}
            priority={true}
            alt="pic"
            className="max-lg:hidden object-contain w-[600px] h-[600px]"
          />
          <div className="h-[95%] w-[400px] rounded-2xl bg-white flex flex-col justify-center items-center">
            {/* <div
            onClick={() => {
              router.push("../side/todo");
            }}
            className="text-[12px] font-semibold text-gray-800 justify-end w-[90%]  flex"
          >
            Skip
          </div> */}
            {/* Create /Join */}
            {/* <div className="h-[90%] w-[100%] flex justify-center items-center"> */}
            {join === 0 ? (
              <div className="flex flex-col">
                <div
                  onClick={() => {
                    setJoin(1);
                  }}
                  className="text-[16px] hover:bg-[#f1e4d0] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl bg-[#FFC977] text-black"
                >
                  Create an organization
                </div>
                <div className="text-[16px] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl  text-black">
                  OR
                </div>
                <div
                  onClick={() => {
                    fetchOrg();
                    setJoin(2);
                  }}
                  className="text-[16px] hover:bg-[#f1e4d0] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl bg-[#FFC977] text-black"
                >
                  Join an organization
                </div>
                <div className="text-[16px] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl  text-black">
                  OR
                </div>
                <div
                  onClick={signupAsIndividual}
                  className="text-[16px] hover:bg-[#f1e4d0] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl bg-[#FFC977] text-black"
                >
                  Continue as Individual
                </div>
              </div>
            ) : null}
            {/* </div> */}

            {/* Create Organization */}
            {join === 1 ? (
              <div className="flex flex-col justify-center items-center h-[90%]">
                <div className="h-[50px]  w-[350px] flex justify-between">
                  <div className="text-black text-[20px] font-semibold">
                    Enter your organization's details
                  </div>
                </div>

                <div className=" h-[340px] flex flex-col justify-evenly">
                  {/* Enter industry */}

                  <div className="w-full  flex flex-col  justify-center items-center">
                    <label className="relative flex items-center flex-col">
                      <img
                        src={
                          dp
                            ? URL.createObjectURL(dp)
                            : "/placeholder-image.png"
                        }
                        alt="Choose"
                        className="rounded-full text-[8px] bg-gray-200 h-[50px] w-[50px]"
                      />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer h-12 w-full rounded-full"
                      />
                      {!dp ? (
                        <div className="mt-2 text-[10px] text-black">
                          Upload
                        </div>
                      ) : (
                        <div className="mt-2 text-[10px] text-black">
                          {dp.name}
                        </div>
                      )}
                      {/* <div className="text-sm mt-2">{imge}</div> */}
                    </label>
                    {dp && (
                      <button
                        className="mt-1 text-[10px] underline text-red-500 hover:text-red-700 focus:outline-none"
                        onClick={() => {
                          setDp("");
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <div className="text-[14px] font-sans font-semibold text-black">
                      Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      value={org}
                      onChange={(e) => {
                        setOrg(e.target.value);
                      }}
                      placeholder="Organization's name"
                      className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                    />
                  </div>

                  <div>
                    <div className="text-[14px] font-sans font-semibold text-black">
                      Generate Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      value={code}
                      placeholder="Organization's name"
                      className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                    />

                    <div
                      onClick={generatecode}
                      className="cursor-pointer text-sm"
                    >
                      Generate new code
                    </div>
                  </div>

                  {/* Enter Location */}
                  {/* <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Location
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div> */}

                  {/* Enter field */}
                  {/* <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Type
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div> */}

                  {/* Enter no. of employees */}
                  {/* <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Number of members
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div> */}
                  {/* job */}

                  {/* <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Enter Your Job Role <span className="text-red-500">*</span>
                  </div>
                  <input
                    value={jobrole}
                    onChange={(e) => {
                      setJobrole(e.target.value);
                    }}
                    placeholder="Job Title"
                    className="my-2  text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div> */}
                </div>
                {/* Continue */}
                <div
                  onClick={handleSubmit}
                  className="bg-[#E48700] m-[2] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
                >
                  Next
                </div>
              </div>
            ) : null}

            {/* Join Organization */}
            {join === 2 ? (
              <div className="flex flex-col h-[70%]">
                <div className="h-[50px] w-[350px] flex justify-between">
                  <div className="text-black text-[26px] font-semibold">
                    Join an organization
                  </div>
                  {/* <div className="flex flex-col">
                  <div className="text-[12px] text-[#8D8D8D]">No Account ?</div>

                  <Link
                    href={"/main/signup"}
                    className="text-[#B87514] hover text-[12px]"
                  >
                    Sign up
                  </Link>
                </div> */}
                </div>

                <div className=" h-[340px] flex flex-col justify-evenly">
                  {organisationlist?.map((d) => (
                    <div className="flex justify-between items-center px-3">
                      <div>{d?.title}</div>
                      <div
                        onClick={() => {
                          setOrg(d?.title);
                          setOrgid(d?._id);
                        }}
                      >
                        Join
                      </div>
                    </div>
                  ))}
                </div>
                {/* Continue */}
                {join === 1 ? (
                  <div
                    onClick={handleSubmit}
                    className="bg-[#E48700] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
                  >
                    Next
                  </div>
                ) : (
                  <div
                    onClick={() => setPopup(true)}
                    className="bg-[#E48700] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
                  >
                    {org ? `Join ${org}` : "Next"}
                  </div>
                )}
              </div>
            ) : null}
            {/* <div className="flex flex-col">
            <div className="h-[50px] w-[350px] flex justify-between">
              <div className="text-black text-[26px] font-semibold">
                Sign Up
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] text-[#8D8D8D]">No Account ?</div>

                <Link
                  href={"/main/signup"}
                  className="text-[#B87514] hover text-[12px]"
                >
                  Sign up
                </Link>
              </div>
            </div>

            <div className=" h-[340px] flex flex-col justify-evenly"> */}
            {/* Enter industry */}
            {/* <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Create/Join an Organization
                </div>
                <input
                  value={organization}
                  onChange={(e) => {
                    setOrg(e.target.value);
                  }}
                  placeholder="Organization name"
                  className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                />
              </div> */}
            {/* job */}
            {/* 
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Enter Your Job Title
                </div>
                <input
                  value={jobrole}
                  onChange={(e) => {
                    setJobrole(e.target.value);
                  }}
                  placeholder="Job Title"
                  className="my-2  text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                />
              </div>
            </div> */}
            {/* Continue */}
            {/* <div
              onClick={handleSubmit}
              className="bg-[#E48700] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
            >
              Next
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
