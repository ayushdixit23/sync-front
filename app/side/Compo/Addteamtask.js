import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon.png";
import assign from "../../assets/assign.png";
import arrow from "../../assets/arrow.png";
import pic from "../../assets/pic.png";
import Image from "next/image";
import { useAuthContext } from "@/utils/auth";
import axios from "axios";
import { API } from "@/utils/Essentials";

function Addteamtask({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [memdata, setMemdata] = useState([]);
  const [team, setTeam] = useState([]);
  const { data } = useAuthContext();
  const [load, setLoad] = useState(false);
  const [teamload, setTeamLoad] = useState(false);
  const id = data.id;
  const [assignedteams, setAssignedteams] = useState([]);
  const [assignedusers, setAssignedusers] = useState([]);
  const [task, setTask] = useState("");
  const [orgid, setOrgid] = useState("")

  useEffect(() => {
    const s = localStorage.getItem("orgid")
    setOrgid(s)
  }, [])

  useEffect(() => {
    if (orgid) {
      // func();
      getTeams();
    }
  }, [orgid]);

  const getTeams = async () => {
    try {
      setTeamLoad(true);
      const response = await axios.get(`${API}/getteams/${orgid}`);
      console.log(response.data.teams, "team");
      setTeam(response.data.teams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTeamLoad(false);
    // const team = data.map((i) => i).flat();
    // setTteam(team);
    // console.log(tteam);
  };

  const handleUserClick = (id) => {
    setAssignedusers((prev) => {
      // Check if the user is already in the array
      if (prev.includes(id)) {
        return prev; // If already included, return the previous array without changes
      }
      // Otherwise, add the user id to the array
      return [...prev, id];
    });
  };
  console.log(assignedusers, "assiusers");
  const handleTeamClick = (id) => {
    setAssignedteams((prev) => {
      if (prev.includes(id)) {
        return prev; // If already included, return the previous array without changes
      }
      return [...prev, id];
    });
  };
  console.log(assignedteams, "assiteams");
  const givetask = async (req, res) => {
    try {
      const response = await axios.post(`${API}/assigntask/${id}`, {
        assignedteams: assignedteams,
        assignedusers: assignedusers,
        task: task,
        orgid: orgid,
      });
      console.log(assignedteams);
      console.log(response.data, "givetask");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   if (orgid) {
  //     getTeams();
  //   }
  // }, [orgid]);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
      <div className=" sm:rounded-xl bg-white pn:max-sm:w-[100%] pn:max-sm:h-[100%] flex-col sm:flex-row p-2 gap-2 flex justify-evenly items-center ">
        <div className="h-[280px] w-[90%] sm:w-[300px] ">
          <div className="h-[10%] w-full">
            <div className="text-[16px] text-black flex items-center h-[100%] font-semibold ">
              Add New Task
            </div>
            {/* Add your form or other content here */}
          </div>
          <textarea
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="p-2 bg-[#FFFBF3] outline-none h-[90%] flex items-start justify-start w-full overflow-auto border-2 rounded-xl border-[#FFC248]"
            placeholder="What is the task?"
          />
        </div>
        <div className="flex flex-col h-[280px] w-[90%] sm:w-[300px]">
          {/* Assigning task options */}
          <div className="flex flex-row  h-[40px]  justify-between items-center w-[100%]">
            {/* <div className="flex flex-row h-[100%] items-center  w-[45%] justify-between">
              <Image
                src={assign}
                className="h-[25px] w-[25px] object-contain"
              />
              <div className="text-[16px] text-black flex items-center h-[100%] font-semibold ">
                Assign task to
              </div>
            </div> */}
            <div className="w-[100%] px-2 h-[40px] bg-[#ffd993]  flex flex-row rounded-2xl  items-center ">
              <Image
                src={assign}
                alt="dp"
                className="h-[25px] w-[25px] object-contain"
              />
              <input
                className=" w-[100%] h-[100%] pl-2 text-[#121212]  bg-[#ffd993]  rounded-xl text-[14px] outline-none"
                placeholder=" assign a task"
              />
            </div>
            {/* Add your form or other content here */}
          </div>

          {/* People */}
          <div className="p-2  h-[230px] flex-col flex  items-center w-[100%] overflow-auto rounded-xl [#FFC248]">
            {load ? (
              <div className="w-[98%] my-2 px-2 border-b-[1px]  border-[#f1f1f1] h-[40px]  flex flex-row items-center ">
                <div className="h-[35px] w-[35px] object-contain bg-[#888] rounded-full" />
                <div className=" mx-3  w-[40%] text-[#121212] text-[14px]  outline-none"></div>
                <div className=" text-[#444444] text-[13px]  outline-none"></div>
              </div>
            ) : (
              memdata.map((f, i) => (
                <div
                  key={i}
                  onClick={() => handleUserClick(f?._id)}
                  className="w-[98%] hover:bg-red-400 my-2 px-2 border-b-[1px]  border-[#f1f1f1] h-[40px]  flex flex-row items-center "
                >
                  <Image
                    alt="dp"
                    src={pic}
                    className="h-[35px] w-[35px] object-contain"
                  />
                  <div className=" mx-3  w-[40%] text-[#121212] text-[14px]  outline-none">
                    {f?.name}
                  </div>
                  <div className=" text-[#444444] text-[13px]  outline-none">
                    16 task on progress
                  </div>
                </div>
              ))
            )}

            <div className="w-[98%] my-1 px-1 border-b-[1px] font-semibold  border-[#f1f1f1] h-[40px] text-[14px] flex flex-row items-center ">
              Teams
            </div>
            {teamload ? (
              <div className="w-[98%] my-2 px-2 border-b-[1px]  border-[#f1f1f1] h-[40px] flex flex-row items-center ">
                <div className="h-[35px] w-[35px] object-contain bg-[#888] rounded-full" />

                <div className=" mx-3  w-[40%] text-[#121212] text-[14px] outline-none"></div>
                <div className=" text-[#444444] text-[13px]  outline-none"></div>
              </div>
            ) : (
              team.map((g, i) => (
                <div
                  key={i}
                  onClick={() => handleTeamClick(g?._id)}
                  className="w-[98%] hover:bg-red-400 my-2 px-2 border-b-[1px]  border-[#f1f1f1] h-[40px]  flex flex-row items-center "
                >
                  <Image
                    alt="dp"
                    src={pic}
                    className="h-[35px] w-[35px] object-contain"
                  />
                  <div className=" mx-3  w-[40%] text-[#121212] text-[14px]  outline-none">
                    {g?.teamname}
                  </div>
                  <div className=" text-[#444444] text-[13px]  outline-none">
                    16 task on progress
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-row justify-between gap-2 bg-slate-500 items-center w-[100%] h-[10%]">
            <div
              onClick={onClose}
              className="w-[50%] py-2 flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                givetask();
                onClose();
              }}
              className="w-[50%] py-2 flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-3xl"
            >
              Save Task
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addteamtask;
