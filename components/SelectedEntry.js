import { useEffect, useState } from "react";
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
  const { entry, imageUrl } = props;
  const jsonData = JSON.parse(entry.jsonData);
  const [name, setName] = useState(entry.name);
  const [comments, setComments] = useState(jsonData.comments || "");

  useEffect(() => {
    setName(entry.name);
    setComments(jsonData.comments || "");
  }, [entry]);

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim().length === 0) {
      alert("Name cannot be empty");
      return;
    }
    let newComments = comments;
    if (comments.trim().length === 0) {
      newComments = "";
    }

    const newJsonData = JSON.stringify({
      ...jsonData,
      comments: newComments,
    });
    updateEntry(entry, { name, jsonData: newJsonData })
      .then((newData) => {
        console.log("Updated data", newData.data.updateEntry);
        location.reload();
      })
      .catch((error) => {
        console.error("Failed to update entry", error);
        alert("Failed to update");
      });
  }

  function handleCommentsChange(event) {
    setComments(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value.replace("@", ""));
  }

  return (
    <div>
      <img className={entryImg.className} src={imageUrl} />
      <form className={heroForm.className} onSubmit={handleSubmit}>
        <fieldset className={heroFormFieldset.className}>
          <label>Entry name </label>
          <br />
          <input
            className={heroFormTwitterInput.className}
            type="text"
            onChange={handleNameChange}
            value={name}
          />
          <br />
          <br />
          <label>Comments </label>
          <textarea
            className={heroFormTextArea.className}
            rows="5"
            cols="50"
            name="comments"
            placeholder="Add details about this entry"
            onChange={handleCommentsChange}
            value={comments}
          />
          <input
            className={heroFormSubmitButton.className}
            type="submit"
            value="Update"
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
