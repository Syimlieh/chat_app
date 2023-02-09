import React from "react";
import SignInLeft from "./SignInLeft";
import SignInRight from "./SignInRight";

const SignInComponent = () => {
  return (
    <div className="bg-white">
      <h1>sYiemChat</h1>
      <div className=" relative bg-white w-full text-left text-black font-outfit">
        <div className="flex w-full ">
          <SignInLeft />
          <SignInRight />
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
