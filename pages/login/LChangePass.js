import Head from "next/head";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleEyeChange = (event) => {
    setShowPassword(event);
  };

  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const handleEyeChange2 = (event) => {
    setShowCfmPassword(event);
  };

  return (
    <div>
      <Head>
        <title>Change Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-medium text-5xl font-sans py-8">
          TRAVEL NOW
        </div>
        <div>
          <p className="text-centre font-normal text-2xl basic-1/2 ">
            CHANGE PASSWORD
          </p>
          <div className="inline-block align-right text-right text-sky-900 w-[500px]">
            <a
              href="#"
              className="text-[15px] text-right hover:bg-slate-100 rounded-[10px] px-1 py-0.5  mb-0.5"
            >
              <HelpOutlineIcon className="text-[20px] mr-[5px] align-bottom" />
              Need help?
            </a>
          </div>
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200">
          <div className="flex flex-col items-center m-8">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-center">
              <HttpsIcon className="m-2 " />
              {showPassword ? (
                <div className="w-96 flex justify-between">
                  <input
                    type="text"
                    name="new_password"
                    placeholder="New Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                  <IconButton
                    className="w-[30px] h-[30px] mt-[5px]"
                    onClick={() => handleEyeChange(false)}
                  >
                    <VisibilityIcon className="m-2 text-[20px] text-black" />
                  </IconButton>
                </div>
              ) : (
                <div className="w-96 flex justify-between">
                  <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                  <IconButton
                    className="w-[30px] h-[30px] mt-[5px]"
                    onClick={() => handleEyeChange(true)}
                  >
                    <VisibilityOffIcon className="m-2 text-[20px] text-black" />
                  </IconButton>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center m-8">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <HttpsIcon className="m-2 " />
                {showCfmPassword ? (
                  <div className="w-96 flex justify-between">
                    <input
                      type="text"
                      name="confirm_new_password"
                      placeholder="Confirm New Password"
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
                      name="confirm_new_password"
                      placeholder="Confirm New Password"
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
                  className="bg-gray-100 w-96 p-2 m-8 flex rounded-2xl font-bold justify-center"
                >
                  SAVE
                </a>
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
