import Head from "next/head";

const { default: Header } = require("./Header");
const { default: Footer } = require("./Footer");

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Travel Now</title>
        <link rel="icon" href="/travel.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
