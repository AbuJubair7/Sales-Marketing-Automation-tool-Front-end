"use client";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/employeeTable";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LogoutButton from "@/app/components/logoutBtn";

const Page = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const token = Cookies.get("authToken");
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await fetch("http://localhost:8000/payment/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        router.push("/login");
      } else if (res.status === 404) {
        router.push("/payment");
      }
      setLoad(true);
    };
    fetchData();
  }, [router]);
  return (
    <div>
      {load ? <EmployeeTable /> : <h1>Loading...</h1>}
      <LogoutButton />
    </div>
  );
};

export default Page;
