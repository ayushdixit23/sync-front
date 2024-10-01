"use client";
import React, { useCallback, useEffect, useState } from "react";
import pic from "../../../assets/empty.png";
import task from "../../../assets/task.png";
import redflag from "../../../assets/redflag.png";
import greenflag from "../../../assets/greenflag.png";

import { FaAngleDown } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { HiFlag } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import TaskModal from "../../Compo/Addtask";
import TeamModal from "../../Compo/Addteamtask";
import axios from "axios";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { API } from "@/utils/Essentials";
import moment from "moment";
import { useAuthContext } from "@/utils/auth";
import { MdKeyboardArrowUp } from "react-icons/md";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [assignedtasks, setAssignedasks] = useState([]);
  const [team, setTeam] = useState([]);
  // const [load, setLoad] = useState("load");
  // const [click, setClick] = useState(false);
  const [clickself, setClickself] = useState(false);
  const [selfindex, setSelfindex] = useState(-1);
  const { data } = useAuthContext();
  const [viewtask, setViewtask] = useState(true);
  const [viewindex, setViewindex] = useState(0);
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const id = data.id;

  const [orgid, setOrgid] = useState("")
  useEffect(() => {
    const s = localStorage.getItem("orgid")
    setOrgid(s)
  }, [])
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const open = () => {
    setTeamtasks(true);
  };

  const close = () => {
    setTeamtasks(false);
  };

  const handleImageClick = async ({ taskid, id, progress }) => {
    try {
      // Determine the new progress status
      const newProgress = progress === "Not Started" ? "completed" : "pending";

      const updatedTasks = assignedtasks.map((task) => {
        if (task?._id === taskid) {
          return { ...task, progress: newProgress };
        }
        return task;
      });

      await axios.post(`${API}/updatetask`, {
        id,
        taskid,
        progress: newProgress,
      });

      setAssignedasks(updatedTasks); // Uncomment if needed
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getAssignedTasks/${id}`);

      setAssignedasks(res?.data?.assignedTasks);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  console.log(assignedtasks, "Assignedasks");

  useEffect(() => {
    if (id) {
      getTasks();
    }
  }, [id]);

  const combinedTasks = [
    ...assignedtasks.map((task) => ({
      ...task,
      type: "task",
      timestamp: task.createdAt,
    })),
  ];

  combinedTasks.sort((a) => new Date(a.timestamp));

  // Fetch teams
  const getTeams = async () => {
    try {
      const response = await axios.get(`${API}/getteams/${orgid}`);

      const updatedTeams = response.data.teams.filter((team) =>
        team.members.some((member) => member._id === data?.id)
      );

      setTeam(updatedTeams);
      //setTeam(response.data.teams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (orgid) {
      getTeams();
    }
  }, [orgid]);

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   if (value) {
  //     const filteredResults = dataa.filter((item) =>
  //       item.filename.toLowerCase().includes(value.toLowerCase())
  //     );
  //     //setDataa(filteredResults);
  //     setSearchResults(filteredResults);
  //   } else {
  //     setSearchResults([]);
  //   }
  //   console.log("Search button clicked!");
  // };
  const data1 = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Mango",
    "Orange",
  ];

  const handleSearch = () => {
    setInputVisible(true);
  };

  const handleClose = () => {
    setInputVisible(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter results based on the query
    const results = data1.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optionally handle form submission here
  };

  const sortChatsByDate = () => {
    const sortedChats = [...chats].sort((a, b) => {
      const dateA = new Date(a?.date); // Convert to Date object
      const dateB = new Date(b?.date);

      // Toggle sorting order between ascending and descending
      return isSortedByDate
        ? dateB - dateA // Descending order
        : dateA - dateB; // Ascending order
    });
  };
  const SortBy = () => {
    // State to handle dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };

    // Function to handle sort option click
    const handleSortOption = (option) => {
      console.log(`Sort by: ${option}`);
      setIsDropdownOpen(false); // Close dropdown after selecting
    };
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="font-sans scrollbar-hide h-[100%] flex flex-col justify-evenly items-center">
      {/* Tasks */}
      <div className="h-[100%] w-[100%] bg-[#EAEEF4]  rounded-2xl  flex flex-col justify-between items-center object-contain">
        {/* <div className="text-black text-[12px] font-semibold w-full ml-8 mt-2">
          Total Team Task : 2 tasks
        </div> */}
        <div className="p-2 pl-4 w-[100%] flex items-center ">
          {/* <div className="text-[14px] text-[#444444] font-semibold">
            Total: {tasks?.tasks?.length || 0} Team Tasks
          </div> */}
        </div>

        <div className="h-full scrollbar-hide overflow-auto  w-[100%] flex flex-col justify-start items-center">
          {assignedtasks.length < 1 ? (
            <div className="h-full w-full flex flex-col justify-center items-center">
              {/* for empty task */}
              <Image src={pic} className="h-[300px] w-[300px]" />
              <div className="flex flex-row items-center justify-between">
                <Image src={task} className="h-[25px] w-[25px]" />
                <div className="text-[18px] mx-2 text-[#444444] font-semibold">
                  No tasks found.
                </div>
              </div>
            </div>
          ) : (
            <>
              {team.map((team, index) => {
                // const sortedAssignedTasks = [...team.assignedtasks].sort(
                //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                // );
                // const sortedAssignedTask = [...team.assignedtasks].sort(
                //   (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                // );
                return (
                  <div>
                    <div className="rounded-lg text-[12px] font-semibold px-4 py-4 flex justify-between items-center gap-x-1 ">
                      Total Team Task : 2 task
                      <div className="flex justify-end ml-auto">
                        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-[#EAEEF4]">
                          <button
                            onClick={handleSearch}
                            className="flex items-center justify-center"
                          >
                            <RiSearch2Line className="w-4 h-4" />
                          </button>
                        </div>
                        {isInputVisible && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 relative w-full">
                            <div className="bg-white rounded shadow-lg p-2 w-full">
                              <button
                                onClick={handleClose}
                                className="absolute top-2 right-2"
                              >
                                X
                              </button>
                              <form onSubmit={handleSearchSubmit}>
                                <input
                                  type="text"
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                  placeholder="Search..."
                                  className="border border-[#EAEEF4] rounded p-2 w-64"
                                />
                              </form>
                              {/* Display search results */}
                              {searchResults.length > 0 && (
                                <ul className="mt-2">
                                  {searchResults.map((result, index) => (
                                    <li
                                      key={index}
                                      className="p-1 hover:bg-gray-100"
                                    >
                                      {result}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className="bg-white rounded-3xl p-1 border border-[#EAEEF4] cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <div className="flex items-center text-[13px] text-[#444444] font-medium px-2">
                          Sort by : Date
                          {isDropdownOpen ? (
                            <MdKeyboardArrowUp className="mt-1 ml-1" />
                          ) : (
                            <MdKeyboardArrowDown className="mt-1 ml-1" />
                          )}
                          {isDropdownOpen && (
                            <div className="absolute bg-white mt-9 rounded-lg shadow-lg w-[90px] p-2 border border-[#EAEEF4]left-[-10px]">
                              {/* style={{ top: "100%" }}  */}
                              <div className="py-1 hover:bg-gray-100 cursor-pointer">
                                Newest
                              </div>
                              <div className="py-1 hover:bg-gray-100 cursor-pointer">
                                Oldest
                              </div>
                              {/* <div className="py-1 hover:bg-gray-100 cursor-pointer">
                          A-Z
                        </div>
                        <div className="py-1 hover:bg-gray-100 cursor-pointer">
                          Z-A
                        </div> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                    <div
                      key={index}
                      className="w-[1200px] items-center justify-center rounded-xl bg-white flex flex-col"
                    >
                      {/* For each task */}
                      <div className="h-[60px] px-4 w-[100%] items-center justify-between flex flex-row">
                        <div className="flex">
                          <div className=" flex items-center justify-center">
                            <div className="h-[40px] w-[40px] rounded-full bg-yellow-500 ">
                              <div
                                // src={{ uri: task?.dp }}
                                className="h-[40px] w-[40px] rounded-full bg-red-50 -ml-[3px] border-2 border-yellow-500 -mt-[3px]"
                              />
                            </div>
                          </div>
                          <div className="  h-[100%] px-2 flex flex-col">
                            <div className=" flex flex-row  text-[16px] font-semibold">
                              {/* {task?.assignedusers != []
                      ? task?.assignedusers.map((u, i) => (
                          <div className="font-bold font-sans  text-[14px] text-black">
                            {u?.name || "Unknown"} ,
                          </div>
                        ))
                      : null}
                    {task?.assignedteams != []
                      ? task?.assignedteams.map((t, i) => (
                          <div className="font-bold font-sans  text-[14px] text-black">
                            , {t?.teamName || "Unknown"}
                          </div>
                        ))
                      : null} */}
                              {team?.teamname}
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="text-[12px] font-semibold text-[#414141] w-[100%] ">
                                {team?.admin?.name}
                              </div>
                              <div
                                className="bg-blue-400 items-center justify-center flex
                     w-[30px] h-[15px] text-white p-2 rounded-md  text-[8px] ml-1"
                              >
                                Admin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" flex justify-center pn:max-sm:hidden">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center justify-start">
                              <div className="h-[25px] w-[25px] rounded-full z-30 bg-slate-300 -mr-2"></div>
                              <div className="h-[25px] w-[25px] rounded-full z-20 bg-slate-200 -mr-2 "></div>
                              <div className="h-[25px] w-[25px] rounded-full z-10 bg-slate-100 -mr-2"></div>
                              <div className="h-[25px] w-[25px] rounded-full z-0 bg-slate-50 -mr-2"></div>
                            </div>
                            <div className="text-[14px] font-semibold text-[#414141] w-[100%] pl-3 ">
                              {team?.members?.length > 1
                                ? `${team?.members?.length} Members`
                                : `${team?.members?.length} Member`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[98%] m-2  flex flex-col rounded-2xl text-black">
                        {/* <div
                        onClick={() => {
                          setViewtask(!viewtask);
                          setViewindex(index);
                        }}
                        className="w-[100%] flex items-center justify-center underline  hover:text-slate-500"
                      >
                        {viewindex === index && viewtask ? "See all" : "Hide"}
                      </div> */}

                        {team?.assignedtasks?.length > 0 ? (
                          assignedtasks.map((m, i) => (
                            <div
                              key={i}
                              className={`w-[95%] p-4 border-b-[1px] `}
                            >
                              {console.log(m?.assignedBy?.name, m)}
                              <div className="bg-orange-950 w-[50%]"></div>
                              <div>
                                <div className="text-[14px] w-[100%] text-[#414141] ">
                                  <div className="  flex justify-between items-center">
                                    <div className="font-semibold text-[12px]">
                                      Assigned by: {m?.assignedBy?.name}
                                    </div>
                                    <div className="text-[14px] text-[#414141] ">
                                      {/* {moment(m.createdAt).fromNow()} */}
                                      {moment(m.createdAt).format(
                                        "MMMM Do, YYYY"
                                      )}
                                    </div>
                                  </div>
                                  {/* <div> vkgbnm;</div> */}
                                </div>

                                {/* <div
                                  className="text-[14px] text-black"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {m?.task}
                                </div> */}
                              </div>
                              <div className="w-[100%] bg-[#FFF8EB] flex justify-between ic p-2 mt-4 mb-4 rounded-lg shadow-lg ">
                                {/* Custom box content here */}
                                <p className="text-[13px] text-black w-full" style={{ wordBreak: "break-word" }}>
                                  {m?.task}
                                </p>
                                <div className="w-[100%] flex items-center justify-end">
                                  <div
                                    onClick={() => {
                                      handleImageClick({
                                        taskid: m._id,
                                        id: data.id,
                                        progress: m?.progress,
                                      });
                                    }}
                                    className="object-contain text-[14px] px-2 rounded-full relative flex gap-2 justify-center  w-[10%] items-center self-end"
                                  >
                                    {/* Icon with conditional color changes */}
                                    <HiFlag
                                      className={`text-[18px]  ${m?.progress === "Not Started"
                                        ? "text-red-500"
                                        : m?.progress === "In progress"
                                          ? "text-yellow-500"
                                          : "text-green-500"
                                        }`}
                                    />
                                    {/* <FaAngleDown
                                    onClick={() => {
                                      setClickself(!clickself);
                                      setSelfindex(i);
                                    }}
                                  /> */}
                                    <div
                                      className={`duration-100 ${clickself === true && i === selfindex
                                        ? "h-auto w-auto text-[#000000] font-medium top-5 bg-white p-1 shadow-lg rounded-lg absolute z-50 text-[14px]"
                                        : "h-0 w-0 text-[0px] shadow-sm p-0"
                                        }`}
                                    >
                                      <div
                                        className={`${clickself === true && i === selfindex
                                          ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                          : "py-0 duration-100 cursor-pointer px-0"
                                          }`}
                                      >
                                        Not started
                                      </div>
                                      <div
                                        className={`${clickself === true && i === selfindex
                                          ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                          : "py-0 duration-100 cursor-pointer px-0"
                                          }`}
                                      >
                                        In progress
                                      </div>
                                      <div
                                        className={`${clickself === true && i === selfindex
                                          ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                          : "py-0 duration-100 cursor-pointer px-0"
                                          }`}
                                      >
                                        Done
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() => {
                                  setViewtask(!viewtask);
                                  setViewindex(index);
                                }}
                                className="w-[100%] flex items-center justify-center underline hover:text-slate-500"
                              >
                                {/* {viewindex === index && viewtask
                                  ? "See all"
                                  : "Hide"} */}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="w-[100%] text-[12px] font-semibold flex items-center justify-center">
                            No assigned tasks yet
                          </div>
                        )}

                        <div className=" object-contain flex items-start justify-center py-2"></div>
                      </div>
                    </div>
                  </div>

                  // <div
                  //   key={index}
                  //   className="w-[95%] my-3 items-center justify-center rounded-xl bg-white flex flex-col"
                  // >
                  //   {/* For each task */}
                  //   <div className="h-[60px] w-[98%] bg-white items-center justify-center flex flex-row">
                  //     <div className="w-[5%]  flex items-center justify-center">
                  //       <img
                  //         src={{ uri: task?.dp }}
                  //         className="h-[45px] w-[45px] bg-orange-700 rounded-full"
                  //       />
                  //     </div>

                  //     <div className="w-[85%]  h-[60%] px-2 flex flex-col">
                  //       <div className=" flex flex-row  py-1">
                  //         {task?.assignedusers != []
                  //           ? task?.assignedusers.map((u, i) => (
                  //               <div className="font-bold font-sans  text-[14px] text-black">
                  //                 {u?.name || "Unknown"} ,
                  //               </div>
                  //             ))
                  //           : null}
                  //         {task?.assignedteams != []
                  //           ? task?.assignedteams.map((t, i) => (
                  //               <div className="font-bold font-sans  text-[14px] text-black">
                  //                 , {t?.teamName || "Unknown"}
                  //               </div>
                  //             ))
                  //           : null}
                  //       </div>
                  //       <div className="text-[14px] text-[#414141]">You</div>
                  //     </div>

                  //     <div className="w-[10%] flex justify-center">
                  //       <div className="text-[14px] text-[#414141] ">
                  //         {moment(task.createdAt).fromNow()}
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
                  //     <div className="w-[95%] p-4">
                  //       <div className="text-[14px]  text-black">
                  //         {task?.task}
                  //       </div>
                  //     </div>

                  //     <div className="w-[5%] object-contain flex items-start justify-center py-2">
                  //       <Image
                  //         alt="pic"
                  //         src={greenflag}
                  //         onClick={() => {
                  //           handleImageClick({ taskid: task._id, id: d?._id });
                  //         }}
                  //         className="h-[45px] w-[45px] object-contain"
                  //       />
                  //     </div>
                  //   </div>
                  // </div>
                );
              })}
            </>
          )}

          {/* <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141] ">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>
          <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141]">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>*/}
        </div>
      </div>
      {/* <TaskModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <TeamModal isOpen={teamtasks} onClose={close} />
    </div>
  );
}

export default page;
