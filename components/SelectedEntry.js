import { useEffect, useState } from "react";
import { updateEntry } from "../graphql/api";
import EntryPanel from "./EntryPanel";
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import UpdateEntryModal from "./UpdateEntryModal";

export default function SelectedEntry(props) {
  const { entry } = props;
  const jsonData = JSON.parse(entry.jsonData);
  const [comments, setComments] = useState(jsonData.comments || "");

  useEffect(() => {
    setComments(jsonData.comments || "");
  }, [entry]);

  function handleSubmit(event) {
    event.preventDefault();
    let newComments = comments;
    if (comments.trim().length === 0) {
      newComments = "";
    }

    const newJsonData = JSON.stringify({
      ...jsonData,
      comments: newComments,
    });
    updateEntry(entry, { jsonData: newJsonData })
      .then((newData) => {
        props.updateEntry(newData.data.updateEntry);
      })
      .catch((error) => {
        console.error("Failed to update entry", error);
        alert("Failed to update");
      });
  }

  function handleCommentsChange(event) {
    setComments(event.target.value);
  }

  return (
    <Box maxWidth="90%">
      <UpdateEntryModal
        comments={comments}
        handleCommentsChange={handleCommentsChange}
        handleSubmit={handleSubmit}
      />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Predicted Image</Tab>
          <Tab>Tracked Image</Tab>
          <Tab>Simple Image</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EntryPanel imageUrl={entry["map_url"]} />
          </TabPanel>
          <TabPanel>
            <EntryPanel imageUrl={entry["predicted_url"]} />
          </TabPanel>
          <TabPanel>
            <EntryPanel imageUrl={entry["tracked_url"]} />
          </TabPanel>
          <TabPanel>
            <EntryPanel imageUrl={entry["simple_tracked_url"]} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
