"use client";
import { useState } from "react";

const Footer = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((prev) => prev + 1);
  return (
    <div className="mt-6">
      <p>&copy; {new Date().getFullYear()} Our Company</p>
      <p>You have clicked the following button {count} times</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
};

export default Footer;
