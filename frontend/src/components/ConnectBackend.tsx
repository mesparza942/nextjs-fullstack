"use client";

import { API_BASE_URL } from "@/utils/api";
import { useEffect, useState } from "react";

const ConnectBackend = () => {
  const [backendStatus, setBackendStatus] = useState<string | null>(null);

  const handleConnect = () => {
    fetch(`${API_BASE_URL}/health`)
      .then((response) => response.json())
      .then((data) => setBackendStatus(data.message))
      .catch(() => setBackendStatus(null));
  };

  useEffect(() => {
    if (!backendStatus) {
      handleConnect();
    }
  }, [backendStatus]);

  return (
    <>
      <h1>
        Backend Status:{" "}
        <span className="font-bold">{backendStatus ?? "Down"}</span>
      </h1>
      <button onClick={handleConnect}>Reconnect</button>
    </>
  );
};

export default ConnectBackend;
