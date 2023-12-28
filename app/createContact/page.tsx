"use client";
import React, { useState } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import Navbar from "../components/navbar";
import LogoutButton from "../components/logoutBtn";

const Page = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
  });

  const router = useRouter();
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/contact/create/ContactDto",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.text();
        alert(result);
        router.push("/viewContact");
      } catch (error) {
        alert("error");
      }
    };
    sendData();
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "Right" }}>
        <LogoutButton />
      </div>
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="number"
          name="mobile"
          value={data.mobile}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br></br>
        <label htmlFor="address">Address:</label>
        <textarea
          name="address"
          value={data.address}
          onChange={handleChange}
          required
        ></textarea>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Page;
