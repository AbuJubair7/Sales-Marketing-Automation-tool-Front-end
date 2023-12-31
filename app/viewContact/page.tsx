// "use client";
// import { useRouter } from "@/node_modules/next/navigation";
import React from "react";
import LogoutButton from "../components/logoutBtn";
import Navbar from "../components/navbar";
import AllContact from "../components/allContact";

const Page = () => {
  return (
    <div>
      <Navbar />
      <LogoutButton />
      {/* <h1>Contact List</h1> */}
      <AllContact />
    </div>
  );
};

export default Page;
