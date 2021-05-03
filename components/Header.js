import { headerTitle } from "../styles/header";

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
  let status = props.status;
  // Offline if last update is too old
  if (new Date(status._ts / 1000) < new Date(Date.now() - DIFF_MS)) {
    status = "OFFLINE";
  } else if (status.error) {
    status = "ERROR";
    console.error("Error in status", status.error);
  } else {
    status = status.status;
  }

  return (
    <>
      <h1 className={headerTitle.className}>AviGuardX</h1>
      <p>Status: {loadStatus(status)}</p>
      {headerTitle.styles}
    </>
  );
}
