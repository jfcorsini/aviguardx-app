import StatusBar from "./StatusBar";
import SelectedEntry from "./SelectedEntry";
import { Flex, Heading, IconButton, Center, Text } from "@chakra-ui/react";
import {
  ArrowLeftIcon as LeftArrow,
  ArrowRightIcon as RightArrow,
} from "@chakra-ui/icons";

export default function Content(props) {
  const { entry, updateEntry, moveNext, movePreviously } = props;
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
      <Flex>
        <Center>
          <IconButton onClick={movePreviously} icon={<LeftArrow />} size="md" />
          <Text>Change entry</Text>
          <IconButton onClick={moveNext} icon={<RightArrow />} size="md" />
        </Center>
      </Flex>
      <br />
      <br />
      {entry && <SelectedEntry entry={entry} updateEntry={updateEntry} />}
    </Flex>
  );
}
