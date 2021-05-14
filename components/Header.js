import { useState, useEffect } from "react";
import { fetchStatus } from "../graphql/api";
import { headerTitle, headerSubTitle } from "../styles/header";

function loadStatus(status) {
  switch (status) {
    case "CONNECTING":
      return "Connecting 🔌";
    case "READING":
      return "Reading 🧾";
    case "TRACKING":
      return "Tracking 🐾";
    case "IDENTIFYING":
      return "Identifying 🧠";
    case "OFFLINE":
      return "Offline 🤖";
    case "ERROR":
      return "Something went wrong 😢";
    default:
      return "Unknown status 🐙";
  }
}

const DIFF_MS = 10 * 60 * 1000; // 10 minutes

export default function Header(props) {
  const [status, setStatus] = useState({ status: "CONNECTING" });
  const { onStatusChange } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus()
        .then((result) => {
          setStatus(result.data.status);
          onStatusChange(result.data.status.status);
        })
        .catch((error) => setStatus({ error }));
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchStatus]);
  let readableStatus;

  // Offline if last update is too old
  if (new Date(status._ts / 1000) < new Date(Date.now() - DIFF_MS)) {
    readableStatus = "OFFLINE";
  } else if (status.error) {
    readableStatus = "ERROR";
    console.error("Error in status", status.error);
  } else {
    readableStatus = status.status;
  }

  return (
    <div>
      <h1 className={headerTitle.className}>AviGuardX</h1>
      <p className={headerTitle.headerSubTitle}>
        Status: {loadStatus(readableStatus)}
      </p>
      {headerSubTitle.styles}
      {headerTitle.styles}
    </div>
  );
}
