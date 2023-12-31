"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LogoutButton from "../components/logoutBtn";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";

interface Payment {
  paymentId: number;
  paymentPlan: string;
  paymentPrice: string;
}

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken") || "";
        const res = await fetch("http://localhost:8000/paymentPlan/findall", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          router.push("/login");
        }
      } catch (error) {
        alert("Error");
      }
    };
    fetchData();
  }, [router]);

  const transaction = async (plan: string) => {
    try {
      const token = Cookies.get("authToken") || "";
      const payment = { paymentPlan: plan };
      // alert(payment.paymentPlan);
      const res = await fetch("http://localhost:8000/payment/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payment),
      });
      if (res.ok) {
        const result = await res.json();
        router.push("/manager");
      } else {
        alert("/payment: " + res.status);
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "right", padding: "10px" }}>
        <LogoutButton />
      </div>
      <h1 style={{ textAlign: "center", color: "#006400" }}>Payment</h1>
      <div className="row">
        {data.map((payment) => (
          <div key={payment.paymentId} className="col-md-4 mb-4">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
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
                    width: "100%", // Make the button full width
                  }}
                  onClick={() => {
                    transaction(payment.paymentPlan);
                  }} // Call the pay function when clicked
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
