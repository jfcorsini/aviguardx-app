import { useState, useEffect, useCallback, useRef } from "react";
import { Divider, Flex } from "@chakra-ui/react";
import { fetchEntries } from "../graphql/api";
import Sidebar from "./Sidebar";
import Content from "./Content";

const scrollOptions = {
  behavior: "smooth",
  block: "center",
  inline: "nearest",
};

export default function App(props) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const selectedEntryRef = useRef();

  const moveNext = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const nextIdx = currentEntryIdx + 1;
    if (entries.length > nextIdx) {
      setSelectedEntry(entries[nextIdx]);
    }
    selectedEntryRef.current.scrollIntoView(scrollOptions);
  });

  const movePreviously = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const previousIdx = currentEntryIdx - 1;
    if (previousIdx >= 0) {
      setSelectedEntry(entries[previousIdx]);
    }
    selectedEntryRef.current.scrollIntoView(scrollOptions);
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
    updateEntries(true);
  }, []);

  const updateEntry = useCallback(
    (updatedEntry) => {
      const newEntries = entries.map((e) => {
        if (e._id === updatedEntry._id) {
          return updatedEntry;
        }
        return e;
      });
      setEntries(newEntries);
    },
    [entries, setEntries]
  );

  const onStatusChange = useCallback(async (newStatus) => {
    if (newStatus === "READING") {
      await updateEntries();
    }
  }, []);

  return (
    <Flex height={"100vh"} overflowY="hidden">
      <Sidebar
        entries={entries}
        selectedEntry={selectedEntry}
        setSelectedEntry={setSelectedEntry}
        selectedEntryRef={selectedEntryRef}
      />
      <Divider width="50px" />
      <Content
        onStatusChange={onStatusChange}
        entry={selectedEntry}
        updateEntry={updateEntry}
        moveNext={moveNext}
        movePreviously={movePreviously}
      />
    </Flex>
  );
}
