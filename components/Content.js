import StatusBar from "./StatusBar";
import SelectedEntry from "./SelectedEntry";
import { Flex, Heading } from "@chakra-ui/react";

export default function Content(props) {
  const { entry, updateEntry } = props;
  return (
    <Flex direction="column" flex={6}>
      <Heading
        as="h1"
        fontFamily="Bebas Neue"
        fontWeight="normal"
        fontSize="7xl"
      >
        AviGuardX
      </Heading>
      <StatusBar onStatusChange={props.onStatusChange} />
      <br />
      {entry && <SelectedEntry entry={entry} updateEntry={updateEntry} />}
    </Flex>
  );
}
