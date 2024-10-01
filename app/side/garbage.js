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

function page() {
  const recc = Cookies.get("rooms");
  const cc = decryptaes(recc);
  const chatdata = JSON.parse(cc);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  //  const memoizedText = useMemo(() => text, [text]);
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  // const rec = Cookies.get("r_id");
  // const receive = decryptaes(rec);
  // const receiver_id = JSON.parse(receive); //Receiver id in string
  // const [receiveddata, setReceiveddata] = useState([]);
  const room = chatdata.convId;
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");
  const userid = d._id;
  const receiver_id = chatdata.rid;
  const socket = useMemo(() => io("http://localhost:3003"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
      fetchmssgs();
    });
    socket.on("receive-message", (message, socketID, userid, receiver_id) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, socketID, userid, receiver_id },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const joinRoom = (e) => {
    //console.log("clicked00", socket.connected);
    if (socket.connected === false) {
      socket.connect();
    }
    socket.emit("joinRoom", room);
    //socketemitfunc({ event: "joinRoom", data: room });
    // setRoomName("");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket.connected === false) {
      socket.connect();
    }
    socket.emit("joinRoom", room);
    // if (memoizedText.trim() !== "")
    socket.emit("message", { message, room, socketID, userid, receiver_id });
    //setMessages((prevMessages) => [...prevMessages, memoizedText]);
    // sendchat(memoizedText);
    setMessage("");
  };

  const fetchmssgs = async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/getchats");
      // console.log(res.data);
      const oldmssgs = res.data;
      const formattedMessages = oldmssgs.map((m) => ({
        message: { message: m.message, userid: m.senderid }, // Replace with the correct property name
      }));
      setMessages((prevMessages) => [...formattedMessages, ...prevMessages]);
      setInitialLoad(false);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };

  return (
    <div className="h-[100%] bg-white font-sans w-[100%] flex flex-col">
      {/* Add member */}
      <div className="h-[10%] w-[100%] flex flex-row">
        <div className="h-[100%] w-[70%] px-2">{chatdata.rusername}</div>
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
        {messages.map((m, i) =>
          m.message.userid != userid ? (
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
                  <div className="p-2 text-white">{m.message.message}</div>
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
                    <div className="p-2 text-white">{m.message.message}</div>
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

        {/* Sender */}
        {/* {messages.map((d, i) => (
          <div key={i} className=" flex flex-row justify-end ">
            <div className="flex flex-col  text-[#344054]">
              {/* Member Name */}
        {/* <div className="flex flex-col items-end justify-end">
                <div className="font-semibold text-[14px]">Vaishali Gupta</div>
                <div className="bg-[#FFC977] opacity-95 flex justify-center max-w-[70%] items-end flex-col ">
                  <div className="p-2 text-white">{d}</div>
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
              </div> */}
        {/* Message */}
        {/* </div>
            <div className="w-[5%] flex justify-center items-start">
              <Image
                src={pic}
                alt="pic"
                className="h-[40px] w-[40px] object-contain"
              />
            </div>
          </div>
        ))}  */}
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
