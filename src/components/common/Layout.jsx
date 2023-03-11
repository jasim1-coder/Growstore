import React from "react";
import ScrollToTop from "../../../utils/ScrollToTop";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
