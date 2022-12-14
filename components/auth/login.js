/* eslint-disable react/no-unescaped-entities */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import loginsvg from "@/public/staticImages/svg/loginsvg.svg";
import { FcGoogle } from "react-icons/fc";
import Loader from "../Loader/Loader";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <Image
              src={loginsvg}
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4 text-white">Sign in with</p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className=" inline-block p-1 w-8 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  onClick={() => signIn("google")}
                >
                  <FcGoogle style={{ width: "100%", height: "100%" }} />
                </button>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="button"
                  onClick={() => {
                    signIn("email", { email });
                    setLoading(true);
                  }}
                  className="h-12 flex items-center justify-center  bg-blue-600  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  {loading ? <Loader /> : "Login"}
                </button>
                <p className="text-sm font-semibold mt-8 pt-1 mb-0 ">
                  Don't have an account?
                  <button
                    className="bg-[#3b5998] border border-red-200 px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                    onClick={() => signIn("google")}
                  >
                    <FcGoogle
                      style={{
                        width: "2rem",
                        height: "100%",
                        marginRight: "2rem",
                      }}
                    />
                    Continue with Google
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
