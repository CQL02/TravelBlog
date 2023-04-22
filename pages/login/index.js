import Head from "next/head";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography, InputBase} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from 'next/link'
import Footer from "../../component/Footer"

export default function MainPage() {
  return (
    <Box className="flex flex-col items-center min-h-screen py-2 bg-white">
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="flex flex-col items-center flex-1 px-20 text-center">
        <Typography className="font-medium text-5xl font-sans py-8">TRAVEL NOW</Typography>
        <Box className="flex flex-row inline text-[#000000] w-full mb-[-28px] justify-center">
          <Typography className="text-centre font-normal w-full text-base mx-auto">LOGIN</Typography>
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

          <Box className="rounded-2xl bg-white w-96 p-2 flex mx-auto mt-[20px] box-responsive">
            <HttpsIcon className="m-2 " />
            <InputBase
              type="Password"
              name="Password"
              placeholder="Password"
              className="outline-none text-sm flex-1 w-full"
            />
            
            <VisibilityIcon className="m-2 " />
          </Box>


          <Button
            className="flex rounded-2xl bg-white hover:bg-[#F5F5F5] text-black w-96 p-2 flex mx-auto my-[20px] box-responsive"
          >
            LOG IN
          </Button>
        </Box>

        <Box className="flex w-full text-xs px-[10px]">
          Do not have an account?
          <Link href="./login/register" className="text-xs ml-[4px] text-[#1020AE] underline">Create an account</Link>
          <Link href="./login/forgetpassword" className="text-xs ml-auto text-[#1020AE]	underline">
            Forgot Password?
          </Link>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
}
