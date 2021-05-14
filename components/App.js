import { useState, useEffect, useCallback } from "react";
import { fetchEntries } from "../graphql/api";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { hero, appContainer } from "../styles/hero";

export default function App(props) {
  const [entries, setEntries] = useState([]);
  const [imageKey, setImageKey] = useState("map_url");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleKeypress = (event) => {
    if (event.code === "ArrowRight") {
      moveNext();
    }
    if (event.code === "ArrowLeft") {
      movePreviously();
    }
  };

  const moveNext = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const nextIdx = currentEntryIdx + 1;
    if (entries.length > nextIdx) {
      setSelectedEntry(entries[nextIdx]);
    }
  });

  const movePreviously = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const previousIdx = currentEntryIdx - 1;
    if (previousIdx >= 0) {
      setSelectedEntry(entries[previousIdx]);
    }
  });

  const updateEntries = useCallback((updateSelected = false) => {
    fetchEntries()
      .then((result) => {
        const allEntries = result.data.entries.data.reverse();
        setEntries(allEntries);
        if (updateSelected) {
          setSelectedEntry(allEntries[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching entries", error);
      });
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [handleKeypress]);

  useEffect(() => {
    updateEntries(true);
  }, []);

  const onStatusChange = useCallback(async (newStatus) => {
    if (newStatus === "READING") {
      await updateEntries();
    }
  }, []);

  return (
    <div className={appContainer.className}>
      <Sidebar
        entries={entries}
        selectedEntry={selectedEntry}
        imageKey={imageKey}
        setSelectedEntry={setSelectedEntry}
      />
      <Content
        onStatusChange={onStatusChange}
        entry={selectedEntry}
        imageKey={imageKey}
        setImageKey={setImageKey}
      />
      {appContainer.styles}
      {hero.styles}
    </div>
  );
}
