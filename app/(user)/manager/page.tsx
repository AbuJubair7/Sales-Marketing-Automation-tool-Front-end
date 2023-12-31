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
      const res = await fetch("http://localhost:8000/payment/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        router.push("/login");
      } else if (!res.ok) {
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
      <button
        onClick={() => {
          router.push("/payment");
        }}
        style={{
          padding: "10px",
          backgroundColor: "#006400",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "20%",
        }}
      >
        Plan
      </button>
    </div>
  );
};

export default Page;
