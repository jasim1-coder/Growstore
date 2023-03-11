import React from "react";
import ScrollToTop from "../../../utils/ScrollToTop";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="sm:py-12 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
