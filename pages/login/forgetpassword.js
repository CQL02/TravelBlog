import Head from "next/head";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import LanguageIcon from "@mui/icons-material/Language";

export default function ForgetPasswordPage() {
  return (
    <div>
      <Head>
        <title>Forget Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-centre font-bold text-5xl">TRAVEL NOW</div>
        <p className="text-centre text-2xl">FORGET PASSWORD</p>
        <LanguageIcon className="m-2" />
        <a href="#" className="m-2">
          Need help?
        </a>
        <div className="rounded-2xl shadow-2xl bg-blue-200 flex w-2/3 max-w-4xl">
          <div className="flex flex-col items-center mb-3">
            <div className="rounded-2xl bg-gray-100 w-64 p-2 flex justify-centre">
              <EmailIcon className="m-2 " />
              <input
                type="Email"
                name="Email"
                placeholder="Email"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>

            <div className="flex flex-col items-center mb-3">
              <div className="rounded-2xl bg-gray-100 w-64 p-2 flex justify-centre">
                <HttpsIcon className="m-2 " />
                <input
                  type="OTP"
                  name="OTP"
                  placeholder="OTP"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
                <p className="text-xs">request verification</p>
              </div>

              <div>
                <a
                  href="#"
                  className="rounded-full inline-block font-bold bg-gray-100 w-64 p-2 flex items-center"
                >
                  VERIFY
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-left mb-5">
          <a href="#" className="text-xs">
            Back To Login
          </a>
        </div>
      </main>
    </div>
  );
}