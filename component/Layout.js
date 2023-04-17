const { default: Header } = require("./Header");
const { default: Footer } = require("./Footer");

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
