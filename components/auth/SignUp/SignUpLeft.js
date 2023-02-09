import { useRouter } from "next/router";
import React, { useCallback } from "react";

const SignUpLeft = () => {
  const router = useRouter();
  const onYouCanSingInClick = useCallback(() => {
    router.push("/auth/signin");
  }, [router]);

  return (
    <div className="w-[50%] hidden lg:block">
      <h2 className="text-2xl font-semibold font-inherit text-gray-800">
        <span>Welcome to</span>
        <span className="text-brown"> EasyAuto</span>
      </h2>
      <div className="mt-8 ">
        <p className="font-outfit text-2xs leading-10">
          If you already have an account
        </p>
        <p
          className="font-outfit text-2xs cursor-pointer leading-10"
          onClick={onYouCanSingInClick}
        >
          <span>You can</span>
          <span className="text-indigo-200"> SingIn Here !</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpLeft;
