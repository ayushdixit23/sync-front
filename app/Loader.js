import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import React from "react";
import loading from "./assets/Lotties/load.json";

const Loader = () => {
  return (
    <>
      <div className="flex justify-center inset-0   h-[30px] w-[30px] items-center ">
        <Lottie animationData={loading} size={50} loop={true} />
      </div>
    </>
  );
};

export default Loader;
