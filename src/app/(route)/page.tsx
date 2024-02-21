"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  }, []);

  return <div>Hello world!</div>;
}
