import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function RegisterAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const handleEyeChange = (event) => {
    setShowPassword(event);
  };

  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const handleEyeChange2 = (event) => {
    setShowCfmPassword(event);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <Head>
        <title>Register Account</title>
        <link rel="icon" href="/travel.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-medium text-5xl font-sans py-8">
          TRAVEL NOW
        </div>
        <p className="text-centre font-normal text-2xl basic-1/2">REGISTER</p>
        <div className="inline-block align-right text-right text-sky-900 w-[500px]">
          <a
            href="#"
            className="text-[15px] text-right hover:bg-slate-100 rounded-[10px] px-1 py-0.5  mb-0.5"
          >
            <HelpOutlineIcon className="text-[20px] mr-[5px] align-bottom" />
            Need help?
          </a>
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200 h-96">
          <div className="flex flex-col items-center m-5">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-centre">
              <PersonIcon className="m-2 " />
              <input
                type="Username"
                name="Username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>

            <div className="flex flex-col items-center m-5">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <EmailIcon className="m-2 " />
                <input
                  type="Email"
                  name="Email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="flex flex-col items-center m-5">
                <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                  <HttpsIcon className="m-2 " />
                  {showPassword ? (
                    <div className="w-96 flex justify-between">
                      <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <IconButton
                        className="w-[30px] h-[30px]"
                        onClick={() => handleEyeChange(false)}
                      >
                        <VisibilityIcon className="m-2 text-[20px] text-black" />
                      </IconButton>
                    </div>
                  ) : (
                    <div className="w-96 flex justify-between">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <IconButton
                        className="w-[30px] h-[30px]"
                        onClick={() => handleEyeChange(true)}
                      >
                        <VisibilityOffIcon className="m-2 text-[20px] text-black" />
                      </IconButton>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center m-5">
                  <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                    <HttpsIcon className="m-2 " />
                    {showCfmPassword ? (
                      <div className="w-96 flex justify-between">
                        <input
                          type="text"
                          name="password"
                          placeholder="Password"
                          className="bg-gray-100 outline-none text-sm flex-1"
                        />
                        <IconButton
                          className="w-[30px] h-[30px]"
                          onClick={() => handleEyeChange2(false)}
                        >
                          <VisibilityIcon className="m-2 text-[20px] text-black" />
                        </IconButton>
                      </div>
                    ) : (
                      <div className="w-96 flex justify-between">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="bg-gray-100 outline-none text-sm flex-1"
                        />
                        <IconButton
                          className="w-[30px] h-[30px]"
                          onClick={() => handleEyeChange2(true)}
                        >
                          <VisibilityOffIcon className="m-2 text-[20px] text-black" />
                        </IconButton>
                      </div>
                    )}
                  </div>

                  <div>
                    <a
                      href="#"
                      className="bg-gray-100 w-96 p-2 m-5 flex rounded-2xl font-bold justify-center"
                    >
                      CREATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-block align-right text-right text-sky-900 w-[500px] mt-2">
          <a
            href="/login"
            className="text-[15px] mt-2 text-sky-600 hover:text-sky-800 w-96"
          >
            Back To Login
          </a>
        </div>
      </main>
    </div>
  );
}
