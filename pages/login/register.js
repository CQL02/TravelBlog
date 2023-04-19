import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import LanguageIcon from "@mui/icons-material/Language";
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
        <div className="text-centre font-bold text-5xl">TRAVEL NOW</div>
        <p className="text-centre text-2xl">REGISTER</p>
        <LanguageIcon className="m-2" />
        <a href="#" className="m-2">
          Need help?
        </a>

        <div className="rounded-2xl shadow-2xl bg-blue-200 flex w-2/3 max-w-4xl">
          <div className="flex flex-col items-center mb-3">
            <div className="rounded-2xl bg-gray-100 w-64 p-2 flex justify-centre">
              <PersonIcon className="m-2 " />
              <input
                type="Username"
                name="Username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>

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
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-2xl">
                  <HttpsIcon className="m-2 " />
                  <input
                    type="Password"
                    name="Password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                  <VisibilityIcon className="m-2" />
                </div>

                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-100 w-64 p-2 flex items-center rounded-2xl">
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
                      className="rounded-full inline-block font-bold bg-gray-100 w-64 p-2 flex items-center"
                    >
                      CREATE
                    </a>
                  </div>
                </div>
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
