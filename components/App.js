import { useState, useEffect } from "react";
import { useEntries } from "../graphql/api";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { hero, appContainer } from "../styles/hero";

function getEntries(data) {
  return data ? data.entries.data.reverse() : [];
}

export default function App(props) {
  const { data, errorMessage } = useEntries();
  const [entries, setEntries] = useState([]);
  const [imageKey, setImageKey] = useState("map_url");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    if (!entries.length) {
      const allEntries = getEntries(data);
      setEntries(allEntries);
      setSelectedEntry(allEntries[0]);
    }
  }, [data, entries.length]);

  return (
    <div className={appContainer.className}>
      <Sidebar
        entries={entries}
        errorMessage={errorMessage}
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
