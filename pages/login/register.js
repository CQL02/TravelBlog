import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";

export default function RegisterAccount() {
  return (
    <div>
      <Head>
        <title>Register Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-medium text-5xl font-sans py-8">TRAVEL NOW</div>
        <p className="text-centre font-normal text-2xl basic-1/2">REGISTER</p>
        <div className="inline-block align-right text-right text-sky-900	">
          <HelpOutlineIcon className=""/>
          <a href="#" className="m-2 text-s text-right">
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
                  <input
                    type="Password"
                    name="Password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                  <VisibilityIcon className="m-2" />
                </div>

              <div className="flex flex-col items-center m-5">
                  <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                    <HttpsIcon className="m-2 " />
                    <input
                      type="Confirm Password"
                      name="Confirm Password"
                      placeholder="Confirm Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                    <VisibilityIcon className="m-2" />
                  </div>

                  <div>
                    <a
                      href="#"
                      className="bg-gray-100 w-96 p-2 m-5 flex rounded-2xl font-bold justify-center">
                      CREATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="align-left mt-4">
          <a href="#" className="text-xs text-sky-900">
            Back To Login
          </a>
        </div>
      </main>
    </div>
  );
}
