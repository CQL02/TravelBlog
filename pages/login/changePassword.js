import Head from "next/head";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user_id } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleEyeChange = (event) => {
    setShowPassword(event);
  };

  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const handleEyeChange2 = (event) => {
    setShowCfmPassword(event);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!newPassword || !cfmPassword) {
      setErrorMessage("Do not leave field empty!");
      return;
    } else if (newPassword !== cfmPassword) {
      setErrorMessage("Password mismatch!");
      return;
    } else {
      setErrorMessage("");

      try {
        const response = await fetch(
          `http://localhost:8080/users/updatePassword/${user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_password: newPassword }),
          }
        );

        if (response.ok) {
          alert("New password is set");
          setNewPassword("");
          setCfmPassword("");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error changing password: ", error);
        alert("An error occurred while changing password");
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Change Password</title>
        <link rel="icon" href="/travel.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-medium text-5xl font-sans py-8">
          TRAVEL NOW
        </div>
        <div>
          <p className="text-centre font-normal text-2xl basic-1/2 ">
            CHANGE PASSWORD
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200 h-[270px]">
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
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
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
                    name="new_password_hidden"
                    placeholder="New Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
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
                      value={cfmPassword}
                      onChange={(event) => setCfmPassword(event.target.value)}
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
                      name="confirm_new_password_hidden"
                      placeholder="Confirm New Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={cfmPassword}
                      onChange={(event) => setCfmPassword(event.target.value)}
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
                  onClick={handleSave}
                  className="bg-gray-100 w-96 p-2 mx-5 mt-5 flex rounded-2xl font-bold justify-center hover:bg-gray-200 active:bg-gray-300 duration-300"
                >
                  SAVE
                </button>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
