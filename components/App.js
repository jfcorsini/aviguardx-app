import { useState, useEffect, useCallback } from "react";
import { fetchEntries } from "../graphql/api";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { hero, appContainer } from "../styles/hero";

function getEntries(data) {
  return data ? data.entries.data.reverse() : [];
}

export default function App(props) {
  const [entries, setEntries] = useState([]);
  const [imageKey, setImageKey] = useState("map_url");
  const [selectedEntry, setSelectedEntry] = useState(null);

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
    updateEntries(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateEntries();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchEntries]);

  return (
    <div className={appContainer.className}>
      <Sidebar
        entries={entries}
        selectedEntry={selectedEntry}
        imageKey={imageKey}
        setSelectedEntry={setSelectedEntry}
      />
      <Content
        entry={selectedEntry}
        imageKey={imageKey}
        setImageKey={setImageKey}
      />
      {appContainer.styles}
      {hero.styles}
    </div>
  );
}
