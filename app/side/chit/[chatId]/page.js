"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import chit from "../../../assets/chit.png";
import Image from "next/image";
import pic from "../../../assets/pic.png";
import AddMember from "../../../assets/AddMember.png";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/utils/Essentials";
import socket, { socketemitfunc } from "@/app/sockets/socket";
import { useAuthContext } from "@/utils/auth";
import { VscSend } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import { IoChevronBackSharp } from "react-icons/io5";

function page({ params }) {
  //const chatdata = JSON.parse(cc);
  const [chatdata, setChatdata] = useState(null);
  const { data } = useAuthContext();

  useEffect(() => {
    const recc = params.chatId;
    // const recc = Cookies.get("rooms");
    if (recc) {
      const cc = decryptaes(recc);
      if (cc) {
        const parsedData = JSON.parse(cc);
        setChatdata(parsedData);
        console.log(chatdata, "chatdata");
      }
    }
  }, [Cookies]);
  // if data state already exists then
  // const { data: user } = useAuthContext();

  // const userid = data?.id hai
  // console.log(data)

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  //  const memoizedText = useMemo(() => text, [text]);
  // const cookie = Cookies.get("she2202");
  // const cook = decryptaes(cookie);
  // const d = JSON.parse(cook);
  const [mssgsdata, setMssgsdata] = useState([]);
  // const rec = Cookies.get("r_id");
  // const receive = decryptaes(rec);
  // const receiver_id = JSON.parse(receive); //Receiver id in string
  // const [receiveddata, setReceiveddata] = useState([]);
  const room = chatdata?.convId;
  const userid = data.id;

  //const socket = useMemo(() => io("http://localhost:3003"), []);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setSocketId(socket.id);
  //     console.log("connected", socket.id);
  //     fetchmssgs();
  //   });
  //   socket.on("receive-message", (message, socketID, userid, receiver_id) => {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { message, socketID, userid, receiver_id },
  //     ]);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  // const joinRoom = (e) => {
  //   //console.log("clicked00", socket.connected);
  //   if (socket.connected === false) {
  //     socket.connect();
  //   }
  //   socket.emit("joinRoom", room);
  //   //socketemitfunc({ event: "joinRoom", data: room });
  //   // setRoomName("");
  // };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (socket.connected === false) {
  //     socket.connect();
  //   }
  //   socket.emit("joinRoom", room);
  //   // if (memoizedText.trim() !== "")
  //   socket.emit("message", { message, room, socketID, userid, receiver_id });
  //   //setMessages((prevMessages) => [...prevMessages, memoizedText]);
  //   // sendchat(memoizedText);
  //   setMessage("");
  // };

  useEffect(() => {
    if (room) fetchmssgs();

    socketemitfunc({
      event: "joinRoom",
      data: { userId: userid, roomId: room },
    });
    return () => {
      socket.off("ms");
      socket.close();
    };
  }, [room, socket]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("New message:", data);
    });
  }, [socket]);

  const fetchmssgs = async () => {
    try {
      const res = await axios.get(`${API}/getmsg/${room}`);
      setMessages(res.data?.data);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    if (socket.connected === false) {
      socket.connect();
    }

    if (message?.trim()) {
      let messageToSend = {
        text: message,
        sender: data?.id,
        time: Date.now(),
      };
      socket.emit("chatMessage", { roomId: room, data: messageToSend });
      // socketemitfunc({
      //   event: "chatMessage",
      //   data: { roomId: chatdata?.convId, data: data },
      // });
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
      try {
        setMessage("");
        const res = await axios.post(`${API}/savemsg`, {
          convId: room,
          senderId: data?.id,
          text: message,
        });
        // console.log(res.data, "msg saved");
      } catch (e) {
        console.log("Messages not saved", e);
      }
    }
  };

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
    console.log("messages", messages);
  }, [messages]);
  return (
    <div className="h-[100%] bg-white rounded-2xl font-sans w-[100%] flex flex-col">
      {/* Add member */}
      <div className="h-[80px] w-[100%] flex px-2 bg-[#f1f1f1] rounded-t-2xl flex-row justify-between items-center">
        <div className=" flex items-center gap-2 justify-center">
          <IoChevronBackSharp />
          <div className=" text-[16px] font-semibold">
            {chatdata?.chatname || "username"}
          </div>
        </div>

        {/* <div className="h-[100%] bg-gray-700 flex flex-row items-center justify-evenly">
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
        </div> */}

        <FiMenu className="h-[25px] w-[25px]" />
      </div>
      {/* Main  */}
      <div className="h-[80%]  overflow-auto  w-[100%] flex flex-col">
        {/* Receiver */}
        {messages.map((m, i) =>
          data.id != m.sender ? (
            <div key={i} className=" flex flex-row ">
              <div className="w-[5%] flex justify-center items-start">
                <Image
                  src={pic}
                  alt="pic"
                  className="h-[40px] w-[40px] object-contain"
                />
              </div>
              <div className="flex flex-col  text-[#344054]">
                {/* Message */}
                <div className="bg-[#FFC977] opacity-95 flex justify-center items-center flex-col max-w-[70%] ">
                  <div className="p-2 text-white">{m.text}</div>
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
            <div key={i} className=" flex flex-row py-2 justify-end ">
              <div className="flex flex-col  text-[#344054]">
                {/* Member Name */}
                <div className="flex flex-col items-end justify-end">
                  <div className="bg-[#FFC977] opacity-95 flex justify-center items-end flex-col ">
                    <div className="p-2 text-white">{m.text}</div>
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
        <div ref={messagesEndRef} />
      </div>

      {/* type msg */}
      <div className="h-[10%] px-2 w-[100%] flex flex-row gap-2 justify-between items-center">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-[95%] h-[80%] px-3 rounded-2xl shadow-lg outline-none bg-[#f1f1f1]"
          placeholder="Type a message"
        />
        <div
          onClick={sendMessage}
          className="w-[5%] flex justify-center items-center h-[80%] px-2 rounded-2xl shadow-lg outline-none bg-yellow-200"
        >
          <VscSend className="w-[25px] h-[25px]" />
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
