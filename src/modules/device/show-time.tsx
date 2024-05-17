"use client";
import api from "@/lib/axios";
import { intelbras } from "@/lib/intelbras";
import { useState } from "react";

export default function ShowTime() {
  const [deviceTime, setDeviceTime] = useState("");
  const url = `cgi-bin/global.cgi?action=getCurrentTime`;
  const getDeviceTime = async () => {
    // const response = await api.get(url);
    const response = await intelbras.get_users_count();
    setDeviceTime(response.data);
  };
  getDeviceTime();

  return (
    <div>
      <p>Hora do dispositivo: {deviceTime}</p>
    </div>
  );
}
