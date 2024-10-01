<>
  {" "}
  {combinedTasks.map((task, index) => {
    return (
      <div
        // key={index}
        className="w-[99%]  items-center justify-center rounded-xl bg-white flex flex-col"
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
                Marketing
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[14px] font-semibold text-[#414141] w-[100%] ">
                  by vaishali
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
                + 7 member
              </div>
            </div>
          </div>
        </div>
        <div className="w-[98%] m-2 flex flex-col  bg-[#FFF8EB] rounded-2xl text-black">
          <div className="w-[95%] p-4 border-b-[1px] ">
            <div>
              <div className="text-[14px] text-[#414141] ">
                {/* {moment(task.createdAt).fromNow()} */}
                00:12 pm
              </div>
              <div className="text-[14px]  text-black">
                {/* {task?.task} */}
                sry sry sry sry sry sry sry sry srys sry syr sry
              </div>
            </div>
            <div
              onClick={() => {
                handleImageClick({
                  taskid: task._id,
                  id: data.id,
                });
              }}
              className=" object-contain text-[14px] bg-[#00ff7774] px-2 rounded-full border-[1px] text-green-600 relative
                                     border-green-600 flex items-center gap-2 justify-center"
            >
              <div> Done </div>
              <FaAngleDown
                onClick={() => {
                  setClickself(!clickself);
                  setSelfindex(index);
                }}
              />
              <div
                className={`duration-100 ${
                  clickself === true && index === selfindex
                    ? "h-auto w-auto text-[#474747] font-medium top-5 bg-white p-1 shadow-md rounded-lg absolute text-[14px] "
                    : "h-0 w-0 text-[0px] shadow-sm p-0"
                }`}
              >
                <div
                  className={`${
                    clickself === true
                      ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                      : " py-0 duration-100 cursor-pointer px-0"
                  }`}
                >
                  To do
                </div>
                <div
                  className={`${
                    clickself === true
                      ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                      : "py-0 duration-100 cursor-pointer px-0"
                  }`}
                >
                  In progress
                </div>
                <div
                  className={`${
                    clickself === true
                      ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                      : " py-0 duration-100 cursor-pointer px-0"
                  }`}
                >
                  Done{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%] p-4 border-b-[1px] ">
            <div className="text-[14px] text-[#414141] ">
              {/* {moment(task.createdAt).fromNow()} */} 01:00 pm
            </div>
            <div className="text-[14px]  text-black">
              {/* {task?.task} */}
              mewemwewmem mewem mewm mew mew ..... plzzz sry gusa mt ho
            </div>
          </div>
          <div className="w-[95%] p-4">
            <div className="text-[14px] text-[#414141] ">
              {/* {moment(task.createdAt).fromNow()} */} 01:12 pm
            </div>
            <div className="text-[14px]  text-black">
              {/* {task?.task} */}
              plz bata do na kya hua hai
            </div>
          </div>

          <div className="w-[5%] object-contain flex items-start justify-center py-2"></div>
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
</>;

// const getTeams = async () => {
//   try {
//     const response = await axios.get(`${API}/getteams/${data?.orgid?.[0]}`);

//     const updatedTeams = response.data.teams.map((team) => {
//       // If the current user is member of the team than show the team there else not
//       const filteredMembers = team.members.filter(
//         (member) => member._id === data?.id
//       );
//       console.log(filteredMembers, "filteredMembers");
//       return {
//         ...team,
//         members: filteredMembers,
//       };
//     });
//     setTeam(updatedTeams);
//     //setTeam(response.data.teams);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
