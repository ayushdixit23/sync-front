"use client";
import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon.png";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { API } from "@/utils/Essentials";
import { useAuthContext } from "@/utils/auth";
function Addtask({ isOpen, onClose }) {
  if (!isOpen) return null;
  // const [data, setData] = useState([]);
  const [allorganizations, setAllorganizations] = useState([]);
  const [tasks, setTasks] = useState("");
  const [gettasks, setGetTasks] = useState("");
  const { data } = useAuthContext();
  const [load, setLoad] = useState(false);

  // const id = useSelector((state) => state.user.id);
  // const email = useSelector((state) => state.user.email);

  // const cokkie = Cookies.get("she2202");
  // const dec = decryptaes(cokkie);
  // const d = JSON.parse(dec);

  const postTask = async () => {
    try {
      setLoad(true);
      const response = await axios.post(`${API}/newtask`, {
        text: tasks,
        id: data.id,
        assignedby: data.id,
      });
      console.log(response?.data);
      setTasks("");
      onClose();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setLoad(false);
  };

  // const altasks = async () => {
  //   try {
  //     const id = d._id;
  //     const res = await axios.get(`http://localhost:3500/api/mytasks/${id}`);
  //     //console.log(res.data, "tasks");
  //   } catch (e) {
  //     console.log("Tasks not fetched");
  //   }
  // };
  // useEffect(() => {
  //   altasks();
  // }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
      <div className="bg-white p-4 px-6 rounded-xl flex-col flex justify-evenly gap-3 items-center">
        <div className="flex flex-row justify-between items-start w-[100%]">
          <div className="text-[16px] text-[#333333] flex w-[100%] justify-between h-[100%] font-semibold ">
            <div>Add New Task</div>
            <div className="text-[14px] font-medium">0/250</div>
          </div>
          {/* Add your form or other content here */}
        </div>
        <textarea
          className="p-2 bg-[#FFFBF3] outline-none h-[200px] flex justify-start w-[360px] overflow-auto border-2 rounded-xl border-[#FFC248]"
          placeholder="What is the task?"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <div className="flex flex-row justify-between items-center w-[100%] gap-2 space-x-1 h-[10%]">
          <div
            onClick={onClose}
            className="w-[50%] flex justify-center items-center py-2 text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
          >
            Cancel
          </div>
          {load ? (
            <div className="w-[50%] flex justify-center py-2 items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-2xl">
              ...
            </div>
          ) : (
            <div
              onClick={postTask}
              className="w-[50%] flex justify-center py-2 items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-2xl"
            >
              Save Task
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addtask;
