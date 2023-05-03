import Head from "next/head";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Divider } from "@mui/material";

export default function ForgetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen py-2 bg-white">
      <Head>
        <title>Forget Password</title>
        <link rel="icon" href="/travel.ico" />
      </Head>

      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
        <div className="text-center font-medium text-5xl font-sans py-8">
          TRAVEL NOW
        </div>
        <div>
          <p className="text-center font-normal text-2xl basic-1/2 ">
            FORGET PASSWORD
          </p>
          {/* <div className="inline-block align-right text-right text-sky-900 w-[500px]">
            <a
              href="#"
              className="text-[15px] text-right hover:bg-slate-100 rounded-[10px] px-1 py-0.5  mb-0.5"
            >
              <HelpOutlineIcon className="text-[20px] mr-[5px] align-bottom" />
              Need help?
            </a>
          </div> */}
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200">
          <div className="flex flex-col items-center m-8">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-center">
              <EmailIcon className="m-2 " />
              <input
                type="Email"
                name="Email"
                placeholder="Email"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>

            <div className="flex flex-col items-center m-8">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <HttpsIcon className="m-2 " />
                <input
                  type="text"
                  maxLength="6"
                  name="OTP"
                  placeholder="OTP"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
                <Divider orientation="vertical" className="mr-[10px]" />
                <a className="text-xs hover:text-sky-600" href="#">
                  request verification
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="bg-gray-100 w-96 p-2 m-8 flex rounded-2xl font-bold justify-center"
                >
                  VERIFY
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
