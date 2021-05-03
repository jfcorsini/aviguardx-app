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

export default function Hero(props) {
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

  const onChangeRadio = (e) => {
    e.preventDefault();
    setImageKey(e.target.value);
  };

  return (
    <div className={heroContainer.className}>
      <Header status={status} />
      {selectedEntry && (
        <SelectedEntry
          entry={selectedEntry}
          imageUrl={selectedEntry[imageKey]}
        />
      )}
      <div onChange={onChangeRadio}>
        <input
          type="radio"
          value="map_url"
          name="imageKey"
          checked={imageKey === "map_url"}
        />{" "}
        Map
        <br />
        <input
          type="radio"
          value="predicted_url"
          checked={imageKey === "predicted_url"}
          name="imageKey"
        />{" "}
        Predicted
        <br />
        <input
          type="radio"
          value="tracked_url"
          checked={imageKey === "tracked_url"}
          name="imageKey"
        />{" "}
        Tracked Image
        <br />
        <input
          type="radio"
          value="simple_track"
          checked={imageKey === "simple_track"}
          name="imageKey"
        />{" "}
        Simple
        <br />
      </div>
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
