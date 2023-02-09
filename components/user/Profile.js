/* eslint-disable react/no-unknown-property */
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useUpdateProfile, useUserFetchProfile } from "@/hooks/api/useUserApi";
import { GrPrevious } from "react-icons/gr";
import Loader from "../Loader/Loader";
import Link from "next/link";

const Profile = ({ session }) => {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const { mutate: updateProfile, isLoading: loading } = useUpdateProfile();

  const onSuccess = (data) => {
    setUserName(data?.data.data.userName);
    setProfile(data?.data.data.profile);
  };
  const onError = (data) => {};
  const { isLoading, isError, error, data, status } = useUserFetchProfile(
    session,
    onSuccess,
    onError
  );

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("profile", profile);
    formData.append("userName", userName);
    formData.append("file", selectedFile);
    updateProfile(formData);
  };

  if (isError) {
  }
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </Head>

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <Link href="/">
                <GrPrevious className="absolute top-4 left-4 text-2xl text-black cursor-pointer" />
              </Link>
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-1 flex justify-start">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="profileContainer rounded-full overflow-hidden relative mt-[-5rem] cursor-pointer w-36 h-36 ">
                      {filePreview ? (
                        <Image
                          src={filePreview}
                          className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          alt="profile Image"
                          objectFit="cover"
                          layout="fill"
                        />
                      ) : (
                        <Image
                          src="/staticImages/profile.jpg"
                          className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          alt="profile Image"
                          objectFit="cover"
                          layout="fill"
                        />
                      )}

                      <span className="profileOverlay w-full hover:h-36 transition-[height] relative inline-block rounded-full bg-slate-500 opacity-30 z-0">
                        <label
                          htmlFor="file_input"
                          className="block w-full h-full cursor-pointer"
                        ></label>
                        <input
                          className="hidden"
                          id="file_input"
                          type="file"
                          value={""}
                          onChange={(e) => handleChange(e)}
                        />
                      </span>
                      {/* <FaUserCircle className="absolute bottom-4 right-4  z-10 text-3xl " /> */}
                    </div>
                  </div>

                  <div className="lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center lg-justify-center flex justify-end">
                    <button
                      className="bg-pink-500 w-24 h-10 flex items-center justify-center active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => onSubmit(e)}
                    >
                      {loading === true ? <Loader /> : "update"}
                    </button>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <input
                    id="userName"
                    placeholder="Jenna Stones"
                    value={userName}
                    className="userNameInput text-4xl text-center border-b-2 w-max font-semibold leading-normal text-blueGray-700 mb-2 outline-none"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mt-10 py-10 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <textarea
                        type="text"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        className="mb-4 h-max w-full resize-none shadow-none outline-0 text-lg border-none leading-relaxed text-blueGray-700 text-center outline-none border-b-2"
                        placeholder="eg. An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music,"
                      />
                      <a href="#pablo" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <style jsx>{`
        .profileOverlay {
          width: 150px;
          height: 0;
          background: red;
          transition: height 100ms;
        }
        .userNameInput {
          width: -webkit-fill-available;
        }
        .profileContainer:hover .profileOverlay {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Profile;
