"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [welcome, setWelcome] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.text())
      .then((data) => setWelcome(data))
      .catch((err) => setWelcome(err.message));
  });
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "white", fontSize: "2em" }}>{welcome}</h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => {
            router.push("/login");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#006400",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            router.push("/signup");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
