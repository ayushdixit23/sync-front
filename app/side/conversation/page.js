// "use client";
// import React, {
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import Image from "next/image";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { decryptaes, encryptaes } from "@/app/security";
// import axios from "axios";
// import { API } from "@/utils/Essentials";
// import { receiverData } from "@/lib/receiverSlice";
// import { useAppDispatch } from "@/lib/hooks";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/utils/auth";

// function page() {
//   const router = useRouter();
//   // const cookie = Cookies.get("she2202");
//   const dispatch = useAppDispatch();
//   // const cook = decryptaes(cookie);
//   // // const d = JSON.parse(cook);
//   // const recc = Cookies.get("rooms");
//   // const cc = decryptaes(recc);
//   // const chatdata = JSON.parse(cc);
//   // const receiverId = d._id;
//   // const senderId = chatdata.rid;
//   const [dataa, setDataa] = useState([]);
//   const [memdata, setMemdata] = useState([]);
//   const [convId, setConvId] = useState("");
//   const [click, setClick] = useState(1);
//   const { data } = useAuthContext();
//   const [chat, setChat] = useState("Chats");
//   // const func = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:7900/api/getmembers/${d?.orgid}`
//   //     );
//   //     setMemdata(response?.data);
//   //   } catch (e) {
//   //     console.error("Error in finding member", e.message);
//   //   }
//   // };
//   // useEffect(() => {
//   //   func();
//   // }, []);

//   const userchat = async (email) => {
//     try {
//       const receiverid = memdata.find((e) => e.email === email);
//       console.log(receiverid, "cv");
//       if (receiverid) {
//         const res = await axios.post(`${API}/updateconv`, {
//           senderId: d?._id,
//           receiverId: receiverid._id,
//         });
//         console.log(res?.data, "res");
//         const rid = receiverid._id;
//         const rusername = receiverid.name;
//         // const idArray = [d._id, rid];
//         // idArray.sort();
//         // const convId = idArray.join("_");
//         const convId = res.data.convId;
//         setConvId(convId);
//         console.log("convid", convId);
//         dispatch(
//           receiverData({
//             rid: rid,
//             rusername: rusername,
//             convId: convId,
//           })
//         );
//         const cookieData = JSON.stringify({
//           rid: rid,
//           rusername: rusername,
//           convId: convId,
//         });

//         const chatData = encryptaes(cookieData);
//         Cookies.set("rooms", chatData);
//         router.push("../side/chit");
//       } else {
//         console.log("User does not exist ");
//       }
//     } catch (e) {
//       console.error("No User found", e.message);
//     }
//   };

//   const fetchconv = async () => {
//     console.log("ll");
//     try {
//       const res = await axios.get(`${API}/getconv/${data?.id}`);

//       console.log(res.data.data, "convdata");
//       setDataa(res?.data?.data);
//     } catch (e) {
//       console.log("Messages not fetched", e.message);
//     }
//   };

//   useEffect(() => {
//     if (data?.id) {
//       fetchconv();
//     }
//   }, [data?.id]);

//   return (
//     <div className="bg-white w-[100%] h-[100%] flex flex-col">
//       {/* Header */}
//       <div className="w-[100%] md:h-[60px] bg-white pn:max-sm:h-[70px] flex flex-row  items-center gap-2 pl-2 border-b-2 border-[#000]">
//         <div
//           onClick={() => {
//             setChat("Chats");
//           }}
//           className="text-white hover:bg-[#d7ba8d]  p-2 px-4 rounded-lg bg-[#FFC977]"
//         >
//           Chats
//         </div>
//         <div
//           onClick={() => {
//             setChat("Discuss");
//           }}
//           className="text-white hover:bg-[#d7ba8d] p-2 px-4 rounded-lg bg-[#FFC977]"
//         >
//           Discuss
//         </div>
//       </div>
//       {/* Conversations */}
//       {chat === "Chats" ? (
//         <div className="h-[90%] bg-[#f1f1f1]  w-[100%]">
//           {dataa.map((d, i) => (
//             <div
//               key={i}
//               onClick={() => {
//                 userchat(d?.email);
//               }}
//               className="h-[70px] bg-[#f8f8f8] w-[100%] flex flex-row mb-2 items-center justify-evenly"
//             >
//               <div className="w-[4%] h-[70%] items-center justify-center p-1   bg-gray-500 rounded-full ">
//                 <Image
//                   src={require("../../assets/people.png")}
//                   alt="dp"
//                   className="w-[100%] h-[100%] object-contain self-center"
//                 />
//               </div>
//               <div className="w-[90%] h-[100%] flex flex-col justify-center">
//                 {/* other name */}
//                 <div className="text-black font-bold text-[16px]">
//                   {d?.frndname}
//                 </div>
//                 {/* last msg */}
//                 <div className="text-black text-[12px]">
//                   {d?.lastMessageText === ""
//                     ? "Start a new conversation"
//                     : d?.lastMessageText}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : null}
//       {chat === "Discuss" ? (
//         <div className="h-[90%] bg-[#c43535]  w-[100%]"></div>
//       ) : null}
//     </div>
//   );
// }

// export default page;

"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { decryptaes, encryptaes } from "@/app/security";
import axios from "axios";
import { API } from "@/utils/Essentials";
import { receiverData } from "@/lib/receiverSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/utils/auth";

function page() {
  const router = useRouter();
  // const cookie = Cookies.get("she2202");
  const dispatch = useAppDispatch();
  // const cook = decryptaes(cookie);
  // // const d = JSON.parse(cook);
  // const recc = Cookies.get("rooms");
  // const cc = decryptaes(recc);
  // const chatdata = JSON.parse(cc);
  // const receiverId = d._id;
  // const senderId = chatdata.rid;
  const [chats, setChats] = useState([]);
  const [memdata, setMemdata] = useState([]);
  const [convId, setConvId] = useState("");
  const [click, setClick] = useState(1);
  const { data } = useAuthContext();

  const func = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7352/api/getmembers/${data?.orgid}`
      );
      setMemdata(response?.data);
    } catch (e) {
      console.error("Error in finding member", e.message);
    }
  };
  useEffect(() => {
    if (data.orgid) {
      func();
    }
  }, [data]);

  const userchat = async (id, chatname) => {
    try {
      const convId = id;
      setConvId(convId);
      console.log("convid", convId);
      dispatch(
        receiverData({
          id: id,
          chatname: chatname,
          convId: convId,
        })
      );
      const cookieData = JSON.stringify({
        id: id,
        chatname: chatname,
        convId: convId,
      });

      const chatData = encryptaes(cookieData);
      Cookies.set("rooms", chatData);
      router.push(`../side/chit/${chatData}`);
    } catch (e) {
      console.error("No User found", e.message);
    }
  };

  const fetchSingleChat = async () => {
    try {
      const res = await axios.get(`${API}/getconv/${data?.id}`);

      console.log(res.data.data, "convdata");
      setChats(res?.data?.data);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };

  const fetchTeamChat = async () => {
    try {
      const res = await axios.get(`${API}/getTeamconv/${data?.id}`);
      console.log(res.data.data, "convdata");
      setChats(res?.data?.data);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };
  console.log(chats)

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  useEffect(() => {
    if (data?.id) {
      fetchSingleChat();
    }
  }, [data?.id]);

  console.log(chats, "chats");

  return (
    <div className="bg-white w-[100%] h-[100%] flex flex-col">
      {/* Header */}
      <div className="w-[100%] md:h-[60px] bg-white pn:max-sm:h-[70px] flex flex-row  items-center gap-2 pl-2 border-b-2 border-[#000]">
        <div
          className="text-white p-2 px-4 rounded-lg bg-[#FFC977]"
          onClick={fetchSingleChat}
        >
          Chats
        </div>
        <div
          className="text-white p-2 px-4 rounded-lg bg-[#FFC977]"
          onClick={fetchTeamChat}
        >
          Discuss
        </div>
      </div>
      {/* Conversations */}
      <div className="h-[90%] bg-[#f1f1f1] w-[100%]">
        {chats?.map((d, i) => (
          <div
            key={i}
            onClick={() => {
              // d.type === "user" ? userchat(d?._id, d?.chatname) : teamchat(d?._id);
              userchat(d?._id, d?.chatname);
            }}
            className="h-[70px] bg-[#f8f8f8] w-[100%] flex flex-row mb-2 items-center justify-evenly"
          >
            <div className="w-[4%] h-[70%] items-center justify-center p-1   bg-yellow-400 rounded-full ">
              {/* <Image
                src={require("../../assets/people.png")}
                alt="dp"
                className="w-[100%] h-[100%] object-contain self-center"
              /> */}
              <div className="w-[100%] h-full flex justify-center text-white items-center p-3 text-3xl font-semibold">{getInitials(d?.chatname)}</div>
            </div>
            <div className="w-[90%] h-[100%] flex flex-col justify-center">
              {/* other name */}
              <div className="text-black font-bold text-[16px]">

                {d?.chatname}
              </div>
              {/* last msg */}
              <div className="text-black text-[12px]">
                {d?.lastMessageText ? d?.lastMessageText :
                  "Start a new conversation"
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
