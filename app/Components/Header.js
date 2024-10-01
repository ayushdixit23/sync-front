import React from 'react'
import { GoBell } from "react-icons/go"

function Header() {
  return (
    <div className='w-full items-center flex justify-between h-[60px] px-4'> {/* dp */}      
    <div className="h-[40px] w-[40px] rounded-full bg-yellow-500 ">
      <div className="h-[40px] w-[40px] rounded-full bg-red-50 -ml-[3px] border-2 border-yellow-500 -mt-[3px]"/>
        {/* <Image src={pic} className="h-[38px] w-[38px] object-contain" /> */}
    </div> 
    <div className="p-2 border-2 border-[#EAEEF4] rounded-full " ><GoBell className='h-6 w-6 text-[#7E92A2]'/></div></div>
  )
}

export default Header