import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

export default function RegisterAccount() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleEyeChange = (event) => {
    setShowPassword(event);
  };

  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const handleEyeChange2 = (event) => {
    setShowCfmPassword(event);
  };

  const handleOnClick = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please do not leave field empty!");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Password Mismatch. Please re-enter!");
      return;
    } else {
      setErrorMessage("");

      const response = await fetch("/images/default_profile_pic.jpg"); // Fetch the image file
      const image = await response.blob();

      const file = new File([image], "default_profile_pic.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const fd = new FormData();
      fd.append("username", username);
      fd.append("user_email", email);
      fd.append("user_password", password);
      fd.append("user_image", file);

      try {
        const response = await fetch(`http://localhost:8080/auth/register`, {
          method: "POST",
          body: fd,
        });

        if (response.ok) {
          alert("Account successfully created!");
          router.push("/login");
        } else {
          alert("Failed to update post");
        }
      } catch {
        console.error("Error create account: ", error);
        alert("An error occurred while creating account");
      }
    }
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

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200 h-[69vh]">
          <div className="flex flex-col items-center m-5">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-centre">
              <PersonIcon className="m-2 " />
              <input
                type="text"
                name="Username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="flex flex-col items-center m-5">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <EmailIcon className="m-2 " />
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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

                <div className="flex flex-col items-center m-5">
                  <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                    <HttpsIcon className="m-2 " />
                    {showCfmPassword ? (
                      <div className="w-96 flex justify-between">
                        <input
                          type="text"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="bg-gray-100 outline-none text-sm flex-1"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
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
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
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
                    <button
                      className="bg-gray-100 w-96 p-2 mx-5 mt-5 flex rounded-2xl font-bold justify-center hover:bg-gray-200 active:bg-gray-300 duration-300"
                      onClick={handleOnClick}
                    >
                      CREATE
                    </button>
                  </div>
                  {errorMessage && <p>{errorMessage}</p>}
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
