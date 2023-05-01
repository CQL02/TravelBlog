import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MainPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleEyeChange = (event) => {
    setShowPassword(event);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-center font-medium text-5xl font-sans py-8">
          TRAVEL NOW
        </div>
        <div className="text-center font-normal text-2xl basic-1/2">LOGIN</div>
        <div className="inline-block align-right text-right text-sky-900 w-[500px]">
          <a
            href="#"
            className="text-[15px] text-right hover:bg-slate-100 rounded-[10px] px-1 py-0.5  mb-0.5"
          >
            <HelpOutlineIcon className="text-[20px] mr-[5px] align-bottom" />
            Need help?
          </a>
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200">
          <div className="flex flex-col items-center m-8">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-center">
              <PersonIcon className="m-2 " />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="flex flex-col items-center m-8">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <HttpsIcon className="m-2 " />
                {showPassword ? (
                  <div className="w-96 flex justify-between">
                    <input
                      type="text"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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
            </div>

            <div>
              <a
                href="#"
                className="bg-gray-100 w-96 p-2 flex rounded-2xl font-bold justify-center"
                onClick={handleSubmit}
              >
                LOG IN
              </a>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>

        <div className="flex w-[480px] justify-between">
          <div className="flex">
            <div className="flex items-center text-[15px] mt-4 flex justify-start mr-[6px]">
              Do not have an account?
            </div>
            <a
              className="text-[15px] mt-4 text-sky-600 hover:text-sky-800"
              href="/login/register"
            >
              Create an account
            </a>
          </div>
          <a
            href="/login/forgetpassword"
            className="text-[15px] mt-4 text-sky-600 hover:text-sky-800	"
          >
            Forgot Password?
          </a>
        </div>
      </main>
    </div>
  );
}
