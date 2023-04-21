import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-medium text-5xl font-sans py-8">TRAVEL NOW</div>


        <div className="text-centre font-normal text-2xl basic-1/2">LOGIN</div>
        <div className="inline-block align-right text-right text-sky-900	">
          <HelpOutlineIcon className=""/>
          <a href="#" className="m-2 text-s text-right">
            Need help?
          </a>
        </div>
      
        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200">
          <div className="flex flex-col items-center m-8">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-centre">
              <PersonIcon className="m-2 " />
              <input
                type="Username"
                name="Username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>

            <div className="flex flex-col items-center m-8">
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
            </div>

            <div>
              <a
                href="#"
                className="bg-gray-100 w-96 p-2 flex rounded-2xl font-bold justify-center"
              >
                LOG IN
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs mt-4 flex justify-start">
            Do not have an account?<span className="text-xs mt-4 text-sky-900">Create an account</span>
          </div>
          <div>
          <a href="#" className="text-xs mt-4 text-sky-900	">
            Forgot Password?
          </a>
          </div>
        </div>
      </main>
    </div>
  );
}
