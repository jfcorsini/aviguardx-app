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
  return data ? data.entries.data : [];
}

export default function Hero(props) {
  const { data, errorMessage } = useEntries();
  const [status, setStatus] = useState({ status: "CONNECTING" });
  const [entries, setEntries] = useState([]);
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
      {selectedEntry && <SelectedEntry entry={selectedEntry} />}
      <Sidebar
        entries={entries}
        errorMessage={errorMessage}
        selectedEntry={selectedEntry}
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
