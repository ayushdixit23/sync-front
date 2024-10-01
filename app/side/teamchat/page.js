"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import chit from "../../assets/chit.png";
import Image from "next/image";
import pic from "../../assets/pic.png";
import AddMember from "../../assets/AddMember.png";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API } from "@/utils/Essentials";
import socket, {
  joingroup,
  socketOnMessage,
  socketemitfunc,
} from "@/app/sockets/socket";

function page() {
  const search = useSearchParams();
  const teamId = search.get("teamId");
  const userId = search.get("userId");
  console.log(teamId, "t", userId, "userId");
  const [messagesdata, setMessagesdata] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  //   const recc = Cookies.get("rooms");
  //   const cc = decryptaes(recc);
  //   const chatdata = JSON.parse(cc);
  //   const [messages, setMessages] = useState([]);
  //   const [message, setMessage] = useState("");
  //   //  const memoizedText = useMemo(() => text, [text]);
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessagesdata((prevMessages) => [...prevMessages, data]);
    });
    fetchmssgs();
    socketemitfunc({
      event: "joinRoom",
      data: { roomId: teamId },
    });

    return () => {
      socket.off("message");
    };
  }, [teamId]);

  const sendmsg = async (e) => {
    e.preventDefault();

    if (socket.connected === false) {
      socket.connect();
    }

    if (newMessage?.trim()) {
      let data = {
        receiver_id: d?._id,
        text: newMessage,
        sender: userId,
        time: Date.now(),
      };
      socket.emit("chatMessage", { roomId: teamId, data: data });
      setMessagesdata((prevMessages) => [...prevMessages, data]);
      try {
        setNewMessage("");
        const response = await axios.post(`${API}/sendteammsg`, {
          teamId: teamId,
          myid: userId,
          text: newMessage,
        });
        console.log(response?.data, "msg saved");
      } catch (e) {
        console.log(e);
      }
    }
    // try {
    //   if (newMessage.trim()) {
    //     const response = await axios.post(`${API}/sendteammsg`, {
    //       teamId: teamId,
    //       myid: userId,
    //       text: newMessage,
    //     });
    //     socket.emit("chatMessage", { roomId: teamId, data: mssgs });
    //     setNewMessage("");
    //     console.log(response?.data);
    //   } else {
    //     console.log("Enter message");
    //   }
    // }
  };

  const fetchmssgs = async () => {
    try {
      // console.log(room, "room");
      const res = await axios.get(`${API}/getTeammsg/${teamId}`);
      console.log(res.data, "mssg");
      setMessagesdata(res?.data?.data);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };
  //   useEffect(() => {
  //     fetchmssgs();
  //   }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesdata]);

  return (
    <div className="h-[100%] bg-white font-sans w-[100%] flex flex-col">
      {/* Add member */}
      <div className="h-[10%] w-[100%] flex flex-row">
        <div className="h-[100%] w-[70%] px-2">Team</div>
        <div className="h-[100%] w-[30%] flex flex-row items-center justify-evenly">
          <Image
            src={pic}
            alt="pic"
            className="h-[40px] w-[40px] object-contain"
          />
          <Image
            src={pic}
            alt="pic"
            className="h-[40px] w-[40px] object-contain"
          />
          <Image
            src={pic}
            alt="pic"
            className="h-[40px] w-[40px] object-contain"
          />
          <Image
            src={pic}
            alt="pic"
            className="h-[40px] w-[40px] object-contain"
          />
          <div className="w-[20%] h-[70%] flex justify-center   items-center border-l-2 border-slate-500">
            <Image
              src={AddMember}
              alt="pic"
              className="h-[40px] w-[40px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="h-[80%]  overflow-auto  w-[100%] flex flex-col">
        {/* Receiver */}
        {messagesdata.map((m, i) =>
          userId != m?.sender ? (
            <div key={i} className=" flex flex-row ">
              <div className="w-[5%] flex justify-center items-start">
                <Image
                  src={pic}
                  alt="pic"
                  className="h-[40px] w-[40px] object-contain"
                />
              </div>
              <div className="flex flex-col  text-[#344054]">
                {/* Member Name */}
                <div className="flex  items-center flex-row">
                  <div className="font-semibold text-[14px]">
                    Vaishali Gupta
                  </div>
                </div>
                {/* Message */}
                <div className="bg-[#FFC977] opacity-95 flex justify-center items-center flex-col max-w-[70%] ">
                  <div className="p-2 text-white">{m?.text}</div>
                  <div className="flex justify-end w-[100%]">
                    <div className="text-[12px] text-white flex justify-center items-center px-2 font-medium">
                      Friday 2:20pm
                    </div>
                    <Image
                      src={chit}
                      alt="pic"
                      className="h-[35px] w-[35px] object-contain "
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className=" flex flex-row justify-end ">
              <div className="flex flex-col  text-[#344054]">
                {/* Member Name */}
                <div className="flex flex-col items-end justify-end">
                  <div className="font-semibold text-[14px]">
                    Vaishali Gupta
                  </div>
                  <div className="bg-[#FFC977] opacity-95 flex justify-center max-w-[70%] items-end flex-col ">
                    <div className="p-2 text-white">{m?.text}</div>
                    <div className="flex justify-end w-[100%]">
                      <div className="text-[12px] text-white flex justify-center items-center px-2 font-medium">
                        Friday 2:20pm
                      </div>
                      <Image
                        src={chit}
                        alt="pic"
                        className="h-[35px] w-[35px] object-contain "
                      />
                    </div>
                  </div>
                </div>
                {/* Message */}
              </div>
              <div className="w-[5%] flex justify-center items-start">
                <Image
                  src={pic}
                  alt="pic"
                  className="h-[40px] w-[40px] object-contain"
                />
              </div>
            </div>
          )
        )}
      </div>

      {/* type msg */}
      <div className="h-[10%]  w-[100%] flex flex-row justify-center items-center">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          className="w-[80%] h-[80%] px-2 rounded-l-lg shadow-lg outline-none bg-yellow-200"
          placeholder="Type a message"
        />
        <div
          onClick={sendmsg}
          className="w-[5%] flex justify-center items-center h-[80%] px-2 rounded-r-lg shadow-lg outline-none bg-yellow-200"
        >
          send
        </div>
      </div>
      {/* room */}
      {/* <div className="h-[10%]  w-[100%] flex flex-row justify-center items-center">
        <input
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          className="w-[80%] h-[80%] px-2 rounded-l-lg shadow-lg outline-none bg-yellow-200"
          placeholder="Room name"
        />
        <div
          onClick={joinRoom}
          className="w-[5%] flex justify-center items-center h-[80%] px-2 rounded-r-lg shadow-lg outline-none bg-yellow-200"
        >
          send
        </div>
      </div> */}
    </div>
  );
}

export default page;
