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
import { useRouter } from "next/navigation";
import axios from "axios";
import socket, { socketemitfunc } from "@/app/sockets/socket";
import { API } from "@/utils/Essentials";
import moment from "moment";

function page() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  //console.log(d, "d");
  const ew = Cookies.get("rooms");
  const ewww = decryptaes(ew);
  //console.log(ewww, "ewww");
  const room = ewww.convId;

  useEffect(() => {
    socket.on("ms", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    fetchmssgs();
    socketemitfunc({
      event: "joinUser",
      data: { userId: d?._id, roomId: d.orgid[0] },
    });
    return () => {
      socket.off("ms");
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (socket.connected === false) {
      socket.connect();
    }

    if (message?.trim()) {
      let data = {
        _id: d?._id,
        text: message,
        sender: { name: d?.name },
        orgid: d?.orgid[0],
        time: Date.now(),
      };
      socketemitfunc({
        event: "chatMessage",
        data: { roomId: d?.orgid[0], data: data },
      });
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage("");
    }
  };

  const fetchmssgs = async () => {
    try {
      const res = await axios.post(`${API}/fetchallmsgs`, { id: d?.orgid[0] });

      if (res.data.success) {
        console.log(res.data.msg, "res.data.msg");
        setMessages(res.data.msg);
      }
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };

  return (
    <div className="h-[100%] bg-white font-sans w-[100%] flex flex-col">
      {/* Add member */}
      <div className="h-[10%] w-[100%] flex flex-row">
        <div className="h-[100%] w-[70%] px-2">{ewww?.rusername}</div>
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
        {/* Sender */}
        {messages.map((d, i) => (
          <div key={i} className=" flex flex-row justify-end mt-3">
            <div className="flex flex-col  text-[#344054]">
              {/* Member Name */}
              <div className="flex flex-col items-end justify-end">
                <div className="font-semibold text-[14px]">
                  {d?.sender?.name}
                </div>
                <div className="bg-[#FFC977] opacity-95 flex justify-center max-w-[70%] items-end flex-col ">
                  <div className="p-2 text-white">{d?.text}</div>
                  <div className="flex justify-end w-[100%]">
                    <div className="text-[12px] text-white flex justify-center items-center px-2 font-medium">
                      {moment(d?.time).format("hh:mm")}
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
        ))}
      </div>

      {/* type msg */}
      <div className="h-[10%]  w-[100%] flex flex-row justify-center items-center">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-[80%] h-[80%] px-2 rounded-l-lg shadow-lg outline-none bg-yellow-200"
          placeholder="Type a message"
        />
        <div
          onClick={sendMessage}
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
