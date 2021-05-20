import StatusBar from "./StatusBar";
import SelectedEntry from "./SelectedEntry";
import {
  Flex,
  Heading,
  IconButton,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon as LeftArrow,
  ArrowRightIcon as RightArrow,
} from "@chakra-ui/icons";

export default function Content(props) {
  const { entry, updateEntry, moveNext, movePreviously, onOpenSidebar } = props;
  return (
    <Flex
      direction="column"
      gridGap="10px"
      ml="20px"
      height="100vh"
      overflowY="hidden"
    >
      <Box>
        <Heading
          as="h1"
          fontFamily="Bebas Neue"
          fontWeight="normal"
          fontSize="7xl"
        >
          AviGuardX
        </Heading>
        <Flex flexDirection="row" justifyContent="space-between">
          <Center gridGap="2">
            <IconButton
              onClick={movePreviously}
              icon={<LeftArrow />}
              size="md"
            />
            <Button onClick={onOpenSidebar}>Show entries</Button>
            <IconButton onClick={moveNext} icon={<RightArrow />} size="md" />
          </Center>
          <StatusBar onStatusChange={props.onStatusChange} />
        </Flex>
      </Box>
      {entry && (
        <Box flex={1}>
          <SelectedEntry entry={entry} updateEntry={updateEntry} />
        </Box>
      )}
    </Flex>
  );
}
