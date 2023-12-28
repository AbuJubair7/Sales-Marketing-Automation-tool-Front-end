"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [welcome, setWelcome] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.text())
      .then((data) => setWelcome(data))
      .catch((err) => setWelcome(err.message));
  });
  return <h1>{welcome}</h1>;
}
