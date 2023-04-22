import Head from "next/head";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Box from "@mui/material/Box";
import { Typography, InputBase, Button } from "@mui/material";
import Link from 'next/link'
import Footer from "../../component/Footer"

export default function ForgetPasswordPage() {
  return (
    <Box className="flex flex-col items-center min-h-screen py-2 bg-white">
      <Head>
        <title>Forget Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="flex flex-col items-center flex-1 px-20 text-center">
        <Typography className="font-medium text-5xl font-sans py-8">TRAVEL NOW</Typography>
        <Box className="flex flex-row inline text-[#000000] w-full mb-[-28px] justify-center">
          <Typography className="text-centre font-normal w-full text-base mx-auto">FORGET PASSWORD</Typography>
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
            <EmailIcon className="m-2 " />
            <InputBase
              type="email"
              name="Email"
              placeholder="Email"
              className="outline-none text-sm flex-1 w-full"
            />
          </Box>

          <Box className="rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <HttpsIcon className="m-2 " />
            <InputBase
              type="Password"
              name="otp"
              placeholder="OTP"
              className="outline-none text-sm flex-1 w-full"
            />
            {/* <Button className="text-[10px] lowercase hover:bg-white active:bg-transparent text-[#000000] h-fit my-auto">sent verification</Button> */}
            <Link href="#" className="text-[10px] my-auto">sent verification</Link>
          </Box>
          <Button 
            className="flex rounded-2xl bg-white hover:bg-[#F5F5F5] text-black w-96 p-2 flex mx-auto my-[20px] font-bold box-responsive"
          >
            VERIFY
          </Button>
        </Box>

        <Box className="flex w-full text-xs px-[10px]">
          <Link href="./" className="text-xs ml-auto text-[#1020AE]	underline">
            Back to login
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
