import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { Center, Flex, useDisclosure } from "@chakra-ui/react";
import { fetchEntries } from "../graphql/api";
import Sidebar from "./Sidebar";
import Content from "./Content";

const scrollOptions = {
  behavior: "smooth",
  block: "center",
  inline: "nearest",
};

export default function App(props) {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntryVar] = useState(null);
  const selectedEntryRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOpenSidebar = () => {
    onOpen();
    setTimeout(() => {
      selectedEntryRef.current.scrollIntoView(scrollOptions);
    }, 10);
  };

  const routerId = router.query.id;
  const isLoadingQueryId = router.asPath.startsWith("/?id=") && !routerId;

  const setSelectedEntry = useCallback(
    (e) => {
      if (isLoadingQueryId) {
        return;
      }
      setSelectedEntryVar(e);
      router.push(
        {
          pathname: "/",
          query: { id: e._id },
        },
        undefined,
        { shallow: true }
      );
    },
    [setSelectedEntryVar, isLoadingQueryId]
  );

  const moveNext = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const nextIdx = currentEntryIdx + 1;
    if (entries.length > nextIdx) {
      setSelectedEntry(entries[nextIdx]);
    }
    if (isOpen) {
      selectedEntryRef.current.scrollIntoView(scrollOptions);
    }
  });

  const movePreviously = useCallback(() => {
    const currentEntryIdx = entries.findIndex(
      (e) => e._id === selectedEntry._id
    );
    const previousIdx = currentEntryIdx - 1;
    if (previousIdx >= 0) {
      setSelectedEntry(entries[previousIdx]);
    }
    if (isOpen) {
      selectedEntryRef.current.scrollIntoView(scrollOptions);
    }
  });

  const updateEntries = useCallback(
    (updateSelected = false) => {
      fetchEntries()
        .then((result) => {
          const allEntries = result.data.entries.data.reverse();
          setEntries(allEntries);
          if (updateSelected) {
            if (routerId && !isLoadingQueryId) {
              const routerEntry = allEntries.find((e) => e._id === routerId);
              if (routerEntry) {
                setSelectedEntry(routerEntry);
                return;
              }
            }

            setSelectedEntry(allEntries[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching entries", error);
        });
    },
    [fetchEntries, setEntries, setSelectedEntry, isLoadingQueryId]
  );

  useEffect(() => {
    updateEntries(true);
  }, [isLoadingQueryId]);

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
    <Center>
      <Flex height={"100vh"}>
        <Sidebar
          entries={entries}
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
          selectedEntryRef={selectedEntryRef}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Content
          onStatusChange={onStatusChange}
          entry={selectedEntry}
          updateEntry={updateEntry}
          moveNext={moveNext}
          movePreviously={movePreviously}
          onOpenSidebar={onOpenSidebar}
        />
      </Flex>
    </Center>
  );
}
