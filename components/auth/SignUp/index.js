import React from "react";
import SignUpLeft from "./SignUpLeft";
import SignUpRight from "./SignUpRight";

const SignUpComponent = () => {
  return (
    <div className="bg-white">
      <h1>sYiemChat</h1>
      <div className=" relative bg-white w-full text-left text-black font-outfit ">
        <div className="flex w-full ">
          <SignUpLeft />
          <SignUpRight />
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
