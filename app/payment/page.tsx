"use client";
import { useRouter } from "@/node_modules/next/navigation";
import React, { useEffect, useState } from "react";
import LogoutButton from "../components/logoutBtn";
import Navbar from "../components/navbar";

interface Payment {
  paymentId: number;
  paymentPlan: string;
  paymentPrice: string;
}

const Page = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/paymentPlan/findall");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          alert("Empty");
        }
      } catch (error) {
        alert("Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "Right" }}>
        <LogoutButton />
      </div>
      <h1>Payment</h1>
      <div className="row">
        {data.map((payment) => (
          <div key={payment.paymentId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{payment.paymentPlan}</h5>
                <p className="card-text">Package: {payment.paymentPlan}</p>
                <p className="card-text">Price: {payment.paymentPrice}</p>
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: "#006400",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Page;
