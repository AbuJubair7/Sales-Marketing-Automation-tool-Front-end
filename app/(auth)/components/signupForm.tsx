"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return Error("Passwords do not match");
    }
    const userData = {
      name,
      email,
      address,
      password,
      role: role.toLowerCase(),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/auth/signup/CreateAuthDto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJwtToken(data.token);
      // Calculate the expiration date
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000);
      // Set the cookie with the calculated expiration date
      Cookies.set("authToken", data.token, { expires: expirationDate });
      Cookies.set("role", data.user.role, { expires: expirationDate });
      Cookies.set("id", data.user.id, { expires: expirationDate });
      if (data.user.role === "employee") {
        router.push("/employee");
      } else if (data.user.role === "admin") {
        router.push("/admin");
      } else if (data.user.role === "manager") {
        router.push("/manager");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "6px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginLeft: "4px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginLeft: "8px" }}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </label>
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
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
