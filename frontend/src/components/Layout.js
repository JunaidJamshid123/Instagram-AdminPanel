import React from "react";
import Sidebar from "./sidebar";

function Layout({ children, setActivePage }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="ml-60 flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
