import { useState, useEffect } from "react";
import { useEntries, useStatus } from "../graphql/api";
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
  const statusResponse = useStatus();
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    if (!entries.length) {
      const allEntries = getEntries(data);
      setEntries(allEntries);
      setSelectedEntry(allEntries[0]);
    }
  }, [data, entries.length]);

  function handleSubmit(event) {
    event.preventDefault();
    if (twitterHandle.trim().length === 0) {
      alert("Please provide a valid twitter handle :)");
      return;
    }
    if (story.trim().length === 0) {
      alert("No favorite memory? This cannot be!");
      return;
    }
  }

  function handleStoryChange(event) {
    setStory(event.target.value);
  }

  function handleTwitterChange(event) {
    setTwitterHandle(event.target.value.replace("@", ""));
  }

  return (
    <div className={heroContainer.className}>
      <div className={hero.className}>
        <Header />
        <form className={heroForm.className} onSubmit={handleSubmit}>
          <fieldset className={heroFormFieldset.className}>
            <textarea
              className={heroFormTextArea.className}
              rows="5"
              cols="50"
              name="story"
              placeholder="What is your favorite memory as a developer?"
              onChange={handleStoryChange}
              value={story}
            />
            <input
              className={heroFormTwitterInput.className}
              type="text"
              placeholder="twitter handle (no '@')"
              onChange={handleTwitterChange}
              value={twitterHandle}
            />
            <input
              className={heroFormSubmitButton.className}
              type="submit"
              value="Submit"
            />
          </fieldset>
        </form>
      </div>
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
