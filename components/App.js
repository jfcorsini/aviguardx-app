import { useState, useEffect } from "react";
import { useEntries, fetchStatus } from "../graphql/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SelectedEntry from "./SelectedEntry";
import {
  hero,
  heroContainer,
  heroForm,
  heroFormFieldset,
  heroFormTextArea,
  heroFormTwitterInput,
  heroFormSubmitButton,
  heroEntries,
} from "../styles/hero";

function getEntries(data) {
  return data ? data.entries.data.reverse() : [];
}

const imageKeyOptions = [
  {
    key: "map_url",
    value: "Map",
  },
  {
    key: "predicted_url",
    value: "Predicted",
  },
  {
    key: "tracked_url",
    value: "Tracked Image",
  },
  {
    key: "simple_tracked_url",
    value: "Simple",
  },
];

export default function App(props) {
  const { data, errorMessage } = useEntries();
  const [status, setStatus] = useState({ status: "CONNECTING" });
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus()
        .then((result) => {
          setStatus(result.data.status);
        })
        .catch((error) => setStatus({ error }));
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div className={heroContainer.className}>
      <Header status={status} />
      {selectedEntry && (
        <SelectedEntry
          entry={selectedEntry}
          imageUrl={selectedEntry[imageKey]}
        />
      )}
      {imageKeyOptions.map(({ key, value }) => (
        <div key={key}>
          <input
            key={key}
            type="radio"
            value={key}
            name="imageKey"
            onChange={(e) => setImageKey(e.target.value)}
            checked={imageKey === key}
          />
          {value}
          <br />
        </div>
      ))}
      <Sidebar
        entries={entries}
        errorMessage={errorMessage}
        selectedEntry={selectedEntry}
        imageKey={imageKey}
        setSelectedEntry={setSelectedEntry}
      />
      {heroEntries.styles}
      {heroFormSubmitButton.styles}
      {heroFormTwitterInput.styles}
      {heroFormTextArea.styles}
      {heroFormFieldset.styles}
      {heroForm.styles}
      {heroContainer.styles}
      {hero.styles}
    </div>
  );
}
