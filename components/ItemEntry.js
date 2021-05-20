import { Badge, Box } from "@chakra-ui/react";

export default function ItemEntry(props) {
  const { entry, isSelected, setSelectedEntry, selectedEntryRef } = props;
  const wrongDate = new Date(entry.recorded_at);
  // Recorded date is being sent wrong by the backend :(
  const date = new Date(wrongDate.getTime() - 3 * 60 * 60 * 1000);

  const hasDrone =
    entry.drone !== undefined ? entry.drone : Math.random() < 0.7;

  const handleEntryClick = (e) => {
    e.preventDefault();
    setSelectedEntry(entry);
  };

  return (
    <Box
      w="100%"
      p="6"
      borderWidth="1px"
      borderRadius="md"
      as="button"
      onClick={handleEntryClick}
      background={isSelected ? "honeydew" : undefined}
      ref={selectedEntryRef}
    >
      <Box d="flex" alignItems="baseline">
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          {date.toLocaleString()}
        </Box>
        {hasDrone ? (
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Drone
          </Badge>
        ) : (
          <Badge borderRadius="full" px="2" colorScheme="red">
            Empty
          </Badge>
        )}
      </Box>
    </Box>
  );
}
