import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "@/pages/chat";

interface Message {
  from: string;
  to: string;
  message: string;
}
export default function Home() {

  return (
    <div className="bg-gray-100 min-h-screen">
      <Chat/>
    </div>
  );
}
