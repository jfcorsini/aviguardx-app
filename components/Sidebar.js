import ItemEntry from "./ItemEntry";
import {
  VStack,
  Center,
  Text,
  Heading,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

export default function Sidebar(props) {
  const { entries, isOpen, onClose } = props;
  const loadingEntries = !entries || !entries.length;

  return (
    <>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading as="h2" size="lg">
              Latest Entries
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Center>
              <VStack>
                {loadingEntries ? (
                  <Text>Loading entries...</Text>
                ) : (
                  entries.map((entry) => {
                    const isSelected =
                      entry._id ===
                      (props.selectedEntry && props.selectedEntry._id);
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
