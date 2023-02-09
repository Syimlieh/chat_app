import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerValidate } from "@/utils/validation";
import { registerApi } from "./signupApi";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

const SignUpRight = () => {
  const [loading, setLoading] = useState();
  const [resError, setResError] = useState();
  const router = useRouter();

  //onsubmit function
  async function onSubmit({ userName, email, password }) {
    setLoading(true);
    const response = await registerApi(userName, email, password, router);
    setLoading(false);
  }

  //formk form
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  return (
    <div className="w-full lg:w-[40%] ">
      <h2 className="text-lg lg:text-[4rem] font-semibold font-inherit text-brown">
        Sign Up
      </h2>
      <form className="relative h-auto mt-24" onSubmit={formik.handleSubmit}>
        {resError && (
          <p className="text-brown text-xs text-center mb-4 absolute -top-12 left-1/2 transform -translate-x-1/2">
            {resError}
          </p>
        )}
        <div className=" relative mb-8">
          <input
            type="userName"
            className={` border-2 border-solid ${
              formik.errors.userName && formik.touched.userName
                ? "border-brown"
                : ""
            }  outline-none bg-gray-100 rounded-[8px] w-full text-3xs font-poppins py-4 px-8 text-gray-300 text-left`}
            name="userName"
            placeholder="Enter userName"
            autoFocus
            {...formik.getFieldProps("userName")}
          />
          {formik.errors.userName && formik.touched.userName ? (
            <span className="text-brown text-xss">
              {formik.errors.userName}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className=" relative mb-8">
          <input
            type="email"
            className={` border-2 border-solid ${
              formik.errors.email && formik.touched.email ? "border-brown" : ""
            }  outline-none bg-gray-100 rounded-[8px] w-full text-3xs font-poppins py-4 px-8 text-gray-300 text-left`}
            placeholder="Enter Email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-brown text-xss">{formik.errors.email}</span>
          ) : (
            <></>
          )}
        </div>

        <div className=" w-full relative mb-8">
          <input
            className={` border-2 border-solid ${
              formik.errors.password && formik.touched.password
                ? "border-brown"
                : ""
            }  outline-none bg-gray-100 rounded-[8px] w-full text-3xs font-poppins py-4 px-8 text-gray-300 text-left`}
            type="password"
            placeholder="Password"
            minLength={8}
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <span className="text-brown text-xss">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}
        </div>
        <button
          className="mt-8 cursor-pointer py-4 px-8 [border:none] rounded-[8px] w-full text-xs bg-indigo-200  text-white font-outfit text-center flex box-border items-center justify-center"
          type="submit"
        >
          {loading ? (
            <span className="-ml-16">
              <Loader />
            </span>
          ) : (
            "REGISTER"
          )}
        </button>
      </form>
      {/*  */}
      <Link href="/auth/signin">
        <p className="mt-8 text-3xs text-center cursor-pointer">
          Click Here to <span className=" text-indigo-200">Register</span>
        </p>
      </Link>
      <div className="flex flex-col gap-12 items-center">
        <h5 className="mt-24 text-base  font-normal font-inherit text-gray-200 inline-block">
          Or continue with Google
        </h5>
      </div>
    </div>
  );
};

export default SignUpRight;
