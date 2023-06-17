import Head from "next/head";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { Divider } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";
import apiUrl from "../api/apiConfig";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disableVerificationButton, setDisableVerificationButton] =
    useState(false);
  const [verificationButtonTimer, setVerificationButtonTimer] = useState(30);

  const handleRequestVerification = async (event) => {
    event.preventDefault();

    if (!email || !username) {
      setErrorMessage("Please enter username and email");
      return;
    } else {
      setErrorMessage("");

      try {
        const response = await fetch(
          `${apiUrl}/email/send-verification-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: email }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVerificationCode(data.code);
          startTimer();
        } else {
          console.error("Failed to send verification email");
        }
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/auth/check-email-username`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, user_email: email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data[0]?.user_id) {
          if (otp === verificationCode) {
            setErrorMessage("");
            router.push(`/login/changePassword?user_id=${data[0].user_id}`);
          } else {
            setErrorMessage("OTP mismatch");
          }
        } else {
          setErrorMessage("Username and/or email not found");
        }
      } else {
        console.error("Failed to send email and username");
      }
    } catch (error) {
      console.error("Error sending email and username:", error);
    }
  };

  const startTimer = () => {
    setDisableVerificationButton(true);

    const timer = setInterval(() => {
      setVerificationButtonTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setDisableVerificationButton(false);
      setVerificationButtonTimer(30);
    }, 30000);
  };

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
        </div>

        <div className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200 h-[360px]">
          <div className="flex flex-col items-center m-8">
            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-center">
              <Person className="m-2 " />
              <input
                type="text"
                name="Username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-center mt-[35px]">
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

            <div className="flex flex-col items-center m-8">
              <div className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                <HttpsIcon className="m-2 " />
                <input
                  type="text"
                  maxLength="6"
                  name="OTP"
                  placeholder="OTP"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                />
                <Divider orientation="vertical" className="mr-[10px]" />
                {disableVerificationButton ? (
                  <text className="text-xs w-[110px] text-gray-500">
                    Retry in {verificationButtonTimer}
                  </text>
                ) : (
                  <a
                    className="text-xs hover:text-sky-600 cursor-pointer w-[110px]"
                    onClick={handleRequestVerification}
                    disabled={disableVerificationButton}
                  >
                    Request Verification
                  </a>
                )}
              </div>

              <div>
                {verificationCode ? (
                  <button
                    onClick={handleVerifyOTP}
                    className="bg-gray-100 w-96 p-2 mx-5 mt-5 flex rounded-2xl font-bold justify-center hover:bg-gray-200 active:bg-gray-300 duration-300"
                  >
                    VERIFY
                  </button>
                ) : (
                  <button
                    onClick={handleVerifyOTP}
                    disabled
                    className="bg-gray-300 w-96 p-2 mx-5 mt-5 flex rounded-2xl font-bold justify-center cursor-not-allowed text-white"
                  >
                    VERIFY
                  </button>
                )}
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
