"use client";
import { encryptaes } from "@/app/security";
import { useAppDispatch } from "@/lib/hooks";
import { receiverData } from "@/lib/receiverSlice";
import { useAuthContext } from "@/utils/auth";
import { API } from "@/utils/Essentials";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import chat from "../../assets/chat.png";
import pic from "../../assets/pic.png";
import { RiGroupLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";


function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createteam, setCreateteam] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [convId, setConvId] = useState("");
  const [team, setTeam] = useState([]);
  const [currentTeamId, setCurrentTeamId] = useState();
  const [orgid, setOrgid] = useState("")

  useEffect(() => {
    const s = localStorage.getItem("orgid")
    setOrgid(s)
  }, [])

  const { data } = useAuthContext();

  const [memdata, setMemdata] = useState([]);

  const func = async () => {
    try {
      const response = await axios.get(
        `${API}/getmembers/${data.id}/${orgid}`
      );
      setMemdata(response?.data);
      console.log(response?.data);
    } catch (e) {
      console.error("Error in finding member", e.message);
    }
  };
  useEffect(() => {
    if (orgid) {
      func();
    }
  }, [orgid]);

  // Passing userid for chatting
  const userchat = async (mail) => {
    try {
      const response = await axios.get(
        `${API}/getmembers/${data.id}/${orgid}`
      );
      console.log(response.data, "members");

      const members = response.data;
      const receiver = members.find((member) => member.email === mail);

      if (receiver) {
        const { id: senderId } = data;
        const { _id: receiverId, name: rusername } = receiver;

        if (senderId === receiverId) {
          console.log("Invalid input: Sender and receiver cannot be the same.");
          return;
        }

        if (!senderId || !receiverId) {
          console.log("Invalid input: Sender or receiver ID is missing.");
          return;
        }

        const updateResponse = await axios.post(`${API}/updateconv`, {
          senderId,
          receiverId,
        });
        console.log(updateResponse.data, "updateResponse");

        const { convId } = updateResponse.data;

        if (!convId) {
          console.log("Conversation ID not found.");
          return;
        }

        setConvId(convId);

        dispatch(
          receiverData({
            rid: receiverId,
            rusername,
            convId,
          })
        );

        const cookieData = JSON.stringify({
          rid: receiverId,
          chatname: rusername,
          convId,
        });
        console.log(cookieData, "cookieData");

        const encryptedChatData = encryptaes(cookieData);
        // Store the encrypted data in cookies
        Cookies.set("rooms", encryptedChatData);
        console.log(encryptedChatData, "encryptedChatData");

        // Navigate to the chat page
        router.push(`../side/chit/${encryptedChatData}`);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(
        "Error occurred while processing user chat:",
        error.message
      );
    }
  };

  // fetching teams data
  // const funcc = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3500/api/team");
  //     //console.log(response.data);
  //     const dataArray = response.data;
  //     //console.log(dataArray);
  //     const team = dataArray.map((i) => i.teamname).flat();
  //     setTeam(team);
  //     // console.log(team);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //   // const team = data.map((i) => i).flat();
  //   // setTteam(team);
  //   // console.log(tteam);
  // };
  // useEffect(() => {
  //   funcc();
  // }, []);

  const joinTeams = async (teamId) => {
    try {
      const userId = data?.id;
      const res = await axios.post(`${API}/joinedteam/${userId}/${teamId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Create new team
  const create = async () => {
    try {
      const res = await axios.post(
        `${API}/v1/createteam/${data?.id}/${orgid}`,
        {
          teamname,
          email,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        await getTeams();
      }
      closeCreateModal();
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const addMembersHandler = async (teamId) => {
    setCurrentTeamId(teamId);
    openAddMembersModal();
  };

  const openCreateModal = () => {
    setAddMembers(false);
    setCreateteam(true);
  };

  const closeCreateModal = () => {
    setCreateteam(false);
  };

  const openAddMembersModal = () => {
    setCreateteam(false);
    setAddMembers(true);
  };

  const closeAddMembersModal = () => {
    setAddMembers(false);
  };

  const getTeams = async () => {
    try {
      const response = await axios.get(`${API}/getteams/${orgid}`);

      setTeam(response.data.teams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // const team = data.map((i) => i).flat();
    // setTteam(team);
    // console.log(tteam);
  };

  useEffect(() => {
    if (orgid) {
      getTeams();
    }
  }, [orgid]);


  const deleteTeams = async (teamId) => {
    try {
      const res = await axios.post(`${API}/v1/deleteteam/${data?.id}/${teamId}/${orgid}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-[100%] w-full scrollbar-hide flex flex-col bg-[#FFFBF3] gap-2 items-center ">
      {/* Search members */}
      <div className=" w-full py-2 sm:rounded-2xl pn:max-sm:hidden font-semibold text-[18px] bg-white px-2 flex flex-row items-center justify-between">
        <div className="  text-[16px] px-4 font-semibold flex flex-row rounded-lg items-center justify-between">
          Team & Members List
        </div>
        {/* Storage used */}
        <div className="h-[100%] gap-4 flex flex-row justify-evenly items-center">
          <div className=" rounded-full border-2 border-[#EAEEF4] p-2">
            <LuSearch />
          </div>
          <div
            onClick={openCreateModal}
            className=" rounded-xl flex text-[14px] py-2 w-[150px] border-2 mr-4 text-white bg-[#FFC248] border-[#FFC248] justify-center items-center font-semibold"
          >
            + Add Member
          </div>
          {/* Modal for creating a new team */}
          {createteam && (
            <div className="modal">
              {/* Add your modal content and form for creating a new team here */}
              <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
                <div className="bg-white p-4 rounded-xl w-[100%] sm:w-[30%] flex-col h-[50%] flex justify-evenly items-center">
                  <div className="flex flex-row  h-[5%] justify-between items-center w-[90%] ">
                    <div className="text-[16px] text-black flex items-center h-[100%] font-semibold ">
                      Create new team
                    </div>
                    {/* Add your form or other content here */}
                  </div>

                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter Team name"
                    value={teamname}
                    onChange={(e) => setTeamname(e.target.value)}
                  />
                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex flex-row justify-between items-center w-[90%] space-x-1 h-[10%]">
                    <div
                      onClick={closeCreateModal}
                      className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
                    >
                      Cancel
                    </div>
                    <div
                      onClick={create}
                      className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-3xl"
                    >
                      Create team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {addMembers && (
            <AddMemberModal
              closeAddMembersModal={closeAddMembersModal}
              teamId={currentTeamId}
              userId={data.id}
            />
          )}
        </div>
      </div>
      {/* <div className="flex justify-around font-semibold text-[15px] gap-10 w-[100%] text-[#444444]">
        <div>Name</div> 
        <div>Role</div>
        <div>Create Date</div> 
        <div>Position</div>     
        <div>Action</div>
      </div> */}
      {/* Team */}
      <div className=" text-[#5A5A5A] text-[14px] h-full  sm:h-[45%] bg-white sm:p-1 sm:rounded-2xl mt-2 w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-[100%] pn:max-sm:hidden pl-2 text-md">Teams </div>
        <div className="flex flex-row bg-[#FFF8EB] sm:rounded-2xl font-bold w-[100%] h-[10%] items-center pn:max-sm:hidden justify-evenly">
          <div className=" w-[45%] px-4 justify-start items-start flex">
            Team name
          </div>
          <div className=" w-[15%]">
            No. of Members
          </div>
          <div className=" w-[20%] flex justify-center items-center">
            Action
          </div>
          {/* <div className=" w-[20%] flex justify-center items-center">
            Discuss
          </div> */}
        </div>

        {/*Members data */}
        {team.length <= 0 ? (
          <div className="h-[50px] w-[100%]  flex justify-center items-center">
            No teams are there
          </div>
        ) : (
          // Members List
          <div className="w-[100%] overflow-auto scrollbar-hide bg-white h-full flex flex-col text-black">
            {team.map(
              (f, i) => (
                // orgname === d?.orgname ?
                <div
                  key={i}
                  className="flex flex-row my-2 ml-6 w-[100%]  h-[75px] items-center  border-b-[1px]  border-[#f1f1f1]"
                >
                  <div className=" pn:max-sm:w-[30%]  w-[50%] space-x-2 px-2 flex justify-items-start">
                    <Image
                      alt="pic"
                      src={pic}
                      className="h-[40px] w-[40px] object-contain"
                    />
                    <div className="flex flex-col ">
                      <div className="text-[14px] font-bold">{f?.teamname}</div>
                      <div className="text-[12px] ">{f?.admin?.name}</div>
                    </div>
                  </div>
                  <div className="w-[10%] pn:max-sm:hidden text-[12px]  flex justify-center">
                    {f?.members?.length}
                  </div>


                  {f?.admin._id === data?.id && (
                    <div


                      className="w-[35%] h-full flex flex-row items-center ml-10 justify-center"
                    >
                      <div className="w-[20%] pn:max-sm:hidden text-[12px] flex justify-center items-center">
                        <div className="w-[20px] flex justify-start items-center ">

                          {f?.admin?._id !== data?.id && (
                            <div onClick={() => joinTeams(f?._id)}>join</div>
                          )}
                          <MdDeleteOutline onClick={() => deleteTeams(f._id)} className="h-[20px] w-[20px] text-red-400" />
                        </div>
                      </div>
                      <RiGroupLine className="h-6 w-6" onClick={() => {
                        addMembersHandler(f?._id);
                      }} />
                    </div>
                  )}
                  {/* <div
                    onClick={() => {
                      router.push(
                        `../side/teamchat?teamId=${f?._id}&userId=${d?._id}`
                      );
                    }}
                    className="w-[20%]   h-full flex flex-row items-center justify-center"
                  >
                    <Image
                      src={chat}
                      alt="chat"
                      className="w-[20px] h-[20px] resize"
                    />
                  </div> */}
                </div>
              )
              // : null
            )}
          </div>
        )}
      </div>
      {/* Members */}
      <div className=" text-[#5A5A5A] text-[14px] h-full sm:h-[42%] bg-white sm:p-1 sm:rounded-2xl mt-2 w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-[100%]">
          Members
        </div>
        <div className="flex flex-row bg-[#FFF8EB] sm:rounded-2xl font-bold w-[100%] h-[10%] items-center pn:max-sm:hidden justify-evenly">
          <div className=" w-[45%] px-4 justify-start items-center flex">
            Name
          </div>
          <div className=" w-[15%] flex justify-center items-center">Role</div>
          <div className=" w-[20%] flex justify-center items-center">
            Action
          </div>
          <div className=" w-[20%] flex justify-center items-center">
            Discuss
          </div>
        </div>

        {/*Members data */}
        {memdata.length <= 0 ? (
          <div className="h-[50px] w-[100%]  flex justify-center items-center">
            No members are there
          </div>
        ) : (
          // Members List
          <div className="w-[100%] overflow-auto scrollbar-hide bg-white h-full flex flex-col text-black">
            {memdata.map((m, i) => (
              <div
                key={i}
                className="flex flex-row my-2 w-[100%] h-[75px] items-center justify-between border-b-[1px] border-[#f1f1f1]"
              >
                <div className="flex items-center pn:max-sm:w-[30%] w-[45%] space-x-2 px-2">
                  <Image
                    alt="pic"
                    src={pic}
                    className="h-[40px] w-[40px] object-contain"
                  />
                  <div className="flex flex-col">
                    <div className="text-[14px] font-bold">{m?.name}</div>
                    <div className="text-[12px] ">{m?.email}</div>
                  </div>
                </div>
                <div className="w-[15%] pn:max-sm:hidden flex justify-center items-center">
                  <div className="bg-[#EBF6F1] text-[12px] rounded-xl text-[#46BD84] px-4 py-2">
                    {m?.jobrole}
                  </div>
                </div>

                <div className="w-[20%] h-full flex flex-row items-center justify-center">
                  <div className="w-[20px] flex justify-start items-center">
                    <MdDeleteOutline className="h-[20px] w-[20px] text-red-400" />
                  </div>
                </div>
                <div
                  onClick={() => userchat(m?.email)}
                  className="w-[20%] h-full flex flex-row  items-center justify-center"
                >
                  <Image
                    src={chat}
                    alt="chat"
                    className="w-[20px] h-[20px] resize"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const AddMemberModal = ({ closeAddMembersModal, teamId, userId }) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `${API}/getAddMembers/${userId}/${teamId}`
      );
      setMembers(response?.data.members);
      setSelectedUserIds(response?.data.teamMembers);
    } catch (e) {
      console.error("Error in finding members", e.message);
    }
  };

  const toggleUser = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((userId) => userId !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const submitUsers = async () => {
    try {
      const response = await axios.post(
        `${API}/joinedteam/${userId}/${teamId}`,
        {
          userIds: selectedUserIds,
        }
      );
      setMembers(response?.data.members);
      setSelectedUserIds(response?.data.teamMembers);
    } catch (e) {
      console.error("Error in finding members", e.message);
    }
    closeAddMembersModal();
  };
  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="modal">
      <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
        <div className="bg-yellow-50 p-4 rounded-xl w-[100%] sm:w-[30%] flex-col h-[70%] flex justify-evenly items-center">
          <div className="flex flex-row h-[5%] justify-between items-center w-[90%]">
            <div className="text-[16px] text-black flex items-center h-[100%] font-semibold">
              Add Users to Team
            </div>
          </div>

          <div className="w-[90%] h-[60%] overflow-y-auto">
            {members.map((user) => (
              <div
                key={user._id}
                className="flex flex-row justify-between items-center p-2 border-b-2 border-[#FFC248]"
              >
                <div className="text-black text-[15px]">{user.name}</div>
                <button
                  onClick={() => toggleUser(user._id)}
                  className={` text-center item-center  text-black rounded-lg ${selectedUserIds.includes(user._id)
                    ? ""
                    : "bg-[#FFC248] p-2 w-[35px]"
                    }`}
                >
                  {selectedUserIds.includes(user._id) ? <></> : <GrAdd />}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center w-[90%] space-x-1 h-[10%]">
            <button
              onClick={closeAddMembersModal}
              className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
            >
              Cancel
            </button>
            <button
              onClick={submitUsers}
              className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-3xl"
            >
              Add Users
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default page;
