"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SigninForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (email === "jubair@gmail.com" && password === "1234") {
    //   router.push("/admin");
    // }
    const response = await fetch("http://localhost:8000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming 'data.token' is the token you want to store

    // Calculate the expiration date
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000);
    // Set the cookie with the calculated expiration date
    Cookies.set("authToken", data.token, { expires: expirationDate });
    Cookies.set("role", data.user.role, { expires: expirationDate });
    Cookies.set("id", data.user.id, { expires: expirationDate });
    if (
      data.user.role === "employee" ||
      data.user.role === "saler" ||
      data.user.role === "marketer"
    ) {
      router.push("/viewContact");
    } else if (data.user.role === "admin") {
      router.push("/admin");
    } else if (data.user.role === "manager") {
      router.push("/manager");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="email"
          style={{ marginRight: "10px", display: "block", textAlign: "left" }}
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            width: "100%",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="password"
          style={{ marginRight: "10px", display: "block", textAlign: "left" }}
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            width: "100%",
          }}
        />
      </div>

      <div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#006400",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
