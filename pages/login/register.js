import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link'
import { InputBase, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Footer from "../../component/Footer"

export default function RegisterAccount() {
  return (
    <Box className="flex flex-col items-center min-h-screen py-2 bg-white">
      <Head>
        <title>Register Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="flex flex-col items-center flex-1 px-20 text-center">
        <Typography className="font-medium text-5xl font-sans py-8">TRAVEL NOW</Typography>
        <Box className="flex flex-row inline text-[#000000] w-full mb-[-28px] justify-center">
          <Typography className="text-centre font-normal w-full text-base mx-auto">REGISTER</Typography>
        </Box>
        <Box className="flex flex-row inline text-[#0011A9] w-full">
          <Box className="ml-auto px-[10px]">
            <Link href="#" className="text-[11px] align-bottom">
              <HelpOutlineIcon className="text-[13px] pb-0.5" /> Need help?
            </Link>
          </Box>
        </Box>

        <Box className="flex flex-col rounded-2xl w-[32vw] bg-[#AED2E4] justify-center ">

          <Box className="flex rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <PersonIcon className="m-2 " />
            <InputBase
              type="Username"
              name="Username"
              placeholder="Username"
              className="outline-none text-sm flex-1 w-full"
            />
          </Box>

          <Box className="flex rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <EmailIcon className="m-2 " />
            <InputBase
              type="Email"
              name="Email"
              placeholder="Email"
              className="outline-none text-sm flex-1"
            />
          </Box>

          <Box className="rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <HttpsIcon className="m-2 " />
            <InputBase
              type="password"
              name="Password"
              placeholder="Password"
              className="outline-none text-sm flex-1 w-full"
            />
            <VisibilityIcon className="m-2 " />
          </Box>

          <Box className="rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <HttpsIcon className="m-2 " />
            <InputBase
              type="password"
              name="Confirm Password"
              placeholder="Confirm Password"
              className="outline-none text-sm flex-1"
            />
            <VisibilityIcon className="m-2" />
          </Box>


          <Button
            className="flex rounded-2xl bg-white hover:bg-[#F5F5F5] text-black w-96 p-2 flex mx-auto my-[20px] box-responsive"
          >
            CREATE
          </Button>


          {/* <Box className="rounded-2xl shadow-2xl flex w-full md:w-auto bg-blue-200 h-96">
            <Box className="flex flex-col items-center m-5">
              <Box className="rounded-2xl bg-gray-100 w-96 p-2 flex justify-centre">

                <PersonIcon className="m-2 " />
                <input
                  type="Username"
                  name="Username"
                  placeholder="Username"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </Box>

              <Box className="flex flex-col items-center m-5">
                <Box className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                  <EmailIcon className="m-2 " />
                  <input
                    type="Email"
                    name="Email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </Box>

                <Box className="flex flex-col items-center m-5">
                  <Box className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                    <HttpsIcon className="m-2 " />
                    <input
                      type="Password"
                      name="Password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                    <VisibilityIcon className="m-2" />
                  </Box>

                  <Box className="flex flex-col items-center m-5">
                    <Box className="bg-gray-100 w-96 p-2 flex items-center rounded-2xl">
                      <HttpsIcon className="m-2 " />
                      <input
                        type="Confirm Password"
                        name="Confirm Password"
                        placeholder="Confirm Password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <VisibilityIcon className="m-2" />
                    </Box>

                    <Box>
                      <a
                        href="#"
                        className="bg-gray-100 w-96 p-2 m-5 flex rounded-2xl font-bold justify-center">
                        CREATE
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box> */ }

        </Box>
        {/* <Box className="align-left mt-4">
          <a href="#" className="text-xs text-sky-900">
            Back To Login
          </a>
        </Box> */}

        <Box className="flex w-full text-xs px-[10px]">
          <Link href="./" className="text-xs ml-auto text-[#1020AE]	underline">
            Back to login
          </Link>
        </Box>
      </Box>

      <Footer/>
    </Box>
  )
}
