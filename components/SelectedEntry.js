import { useState } from "react";
import { updateEntry } from "../graphql/api";
import { entryContainer, entryImg } from "../styles/entry";
import {
  heroForm,
  heroFormFieldset,
  heroFormTextArea,
  heroFormTwitterInput,
  heroFormSubmitButton,
} from "../styles/hero";

export default function SelectedEntry(props) {
  const { entry } = props;
  const jsonData = JSON.parse(entry.jsonData);
  const [name, setName] = useState(entry.name);
  const [comments, setComments] = useState(jsonData.comments || "");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim().length === 0) {
      alert("Please provide a valid twitter handle :)");
      return;
    }
    if (comments.trim().length === 0) {
      alert("No favorite memory? This cannot be!");
      return;
    }

    const newJsonData = JSON.stringify({
      ...jsonData,
      comments,
    });
    updateEntry(entry, { name, jsonData: newJsonData });
  }

  function handleCommentsChange(event) {
    setComments(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value.replace("@", ""));
  }

  return (
    <div className={entryContainer.className}>
      <img className={entryImg.className} src={entry.map_url} />
      <form className={heroForm.className} onSubmit={handleSubmit}>
        <fieldset className={heroFormFieldset.className}>
          <label>Comments </label>
          <br />
          <textarea
            className={heroFormTextArea.className}
            rows="5"
            cols="50"
            name="comments"
            placeholder="Add details about this entry"
            onChange={handleCommentsChange}
            value={comments}
          />
          <label>Entry name </label>
          <input
            className={heroFormTwitterInput.className}
            type="text"
            onChange={handleNameChange}
            value={name}
          />
          <input
            className={heroFormSubmitButton.className}
            type="submit"
            value="Submit"
          />
        </fieldset>
      </form>
      {entryContainer.styles}
      {entryImg.styles}
      {heroForm.styles}
      {heroFormFieldset.styles}
      {heroFormTextArea.styles}
      {heroFormTwitterInput.styles}
      {heroFormSubmitButton.styles}
    </div>
  );
}
