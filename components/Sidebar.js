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
            return (
              <ItemEntry
                key={entry._id}
                entry={entry}
                isSelected={
                  entry._id === (props.selectedEntry && props.selectedEntry._id)
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
