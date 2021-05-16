import ItemEntry from "./ItemEntry";
import { VStack, Center, Text, Heading } from "@chakra-ui/react";

export default function Sidebar(props) {
  const { entries } = props;
  const loadingEntries = !entries || !entries.length;

  return (
    <Center height="100vh" overflowY="scroll">
      <VStack height="100vh" overflowY="auto" overflowX="hidden">
        <Heading as="h2" size="lg">
          Latest Entries
        </Heading>
        {loadingEntries ? (
          <Text>Loading entries...</Text>
        ) : (
          entries.map((entry) => {
            const isSelected =
              entry._id === (props.selectedEntry && props.selectedEntry._id);
            return (
              <ItemEntry
                key={entry._id}
                entry={entry}
                isSelected={isSelected}
                selectedEntryRef={
                  isSelected ? props.selectedEntryRef : undefined
                }
                setSelectedEntry={props.setSelectedEntry}
              />
            );
          })
        )}
      </VStack>
    </Center>
  );
}
