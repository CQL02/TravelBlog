import Head from "next/head";
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import LanguageIcon from '@mui/icons-material/Language';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function MainPage(){
    return(
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <Head>
            <title>Login Page</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <div className="text-centre font-bold text-5xl">TRAVEL NOW</div>
    <div className="text-centre font-bold text-2xl">LOGIN</div>
    <LanguageIcon className="m-2"/>
    <a href="#" className="m-2" >Need help?</a>
        <div className="rounded-2xl shadow-2xl flex w-2/3 max-w-4xl bg-blue-200">
            
            <div className="flex flex-col items-center mb-3">
                <div className="rounded-2xl bg-gray-100 w-64 p-2 flex justify-centre">
                    <PersonIcon className="m-2 "/>
                <input type="Username" name="Username" placeholder="Username" className="bg-gray-100 outline-none text-sm flex-1"/>
                </div>
            
            <div className="flex flex-col items-center mb-3">
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-2xl">
                    <HttpsIcon className="m-2 "/>
                <input type="Password" name="Password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1"/>
                    <VisibilityIcon className="m-2"/>
                </div>

            </div>

            <div>
                <a href="#" className="rounded-full inline-block font-bold bg-gray-100 w-64 p-2 flex items-center">Login</a>
            </div>
            </div>
        </div>

    <div className="flex justify-between mb-5">
        <label className="flex items-center text-xs">Do not have an account?</label>
        <a href="#" className="text-xs">Create an account</a>
        <a href="#" className="text-xs">Forgot Password?</a>
    </div>
    
    </main>
    </div>
    
    
    )
        
    
}