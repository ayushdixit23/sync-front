"use client";
import React, { useState } from "react";
import { MdOutlineTask } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { RiSettings2Line } from "react-icons/ri";
import Link from "next/link";

function Tabbar() {
  const [click, setClick] = useState(1);
  return (
    <div className="w-full items-center flex justify-between h-[50px] px-4">
      {" "}
      {/* section */}
      <Link
        href={"/side/todo"}
        onClick={() => {
          setClick(1);
        }}
      >
        <MdOutlineTask
          className={`h-6 w-6 ${
            click === 1 ? " text-[#FFC977] font-semibold " : "text-[#171717]"
          }`}
        />
      </Link>
      {/* Storage */}
      <Link
        href={"/side/storage"}
        onClick={() => {
          setClick(2);
        }}
      >
        <FaListUl
          className={`h-5 w-5 ${
            click === 2 ? " text-[#FFC977] font-semibold " : "text-[#171717]"
          }`}
        />
      </Link>
      {/* Chats */}
      <Link
        href={"/side/conversation"}
        onClick={() => {
          setClick(3);
        }}
      >
        <MdOutlineChatBubbleOutline
          className={`h-5 w-5 ${
            click === 3 ? " text-[#FFC977] font-semibold " : "text-[#171717]"
          }`}
        />
      </Link>
      {/* Members */}
      <Link
        href={"/side/member"}
        onClick={() => {
          setClick(4);
        }}
      >
        <RiGroupLine
          className={`h-5 w-5 ${
            click === 4 ? " text-[#FFC977] font-semibold " : "text-[#171717]"
          }`}
        />
      </Link>
      {/* Settings */}
      <Link
        href={"/side/member"}
        onClick={() => {
          setClick(5);
        }}
      >
        <RiSettings2Line
          className={`h-5 w-5 ${
            click === 5 ? " text-[#FFC977] font-semibold " : "text-[#171717]"
          }`}
        />
      </Link>
    </div>
  );
}

export default Tabbar;
