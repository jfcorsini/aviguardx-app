import { Box, Image } from "@chakra-ui/react";

export default function SelectedEntry(props) {
  const { imageUrl } = props;

  return (
    <Box>
      <Image maxHeight="calc(100vh - 195px)" src={imageUrl} loading="eager" />
    </Box>
  );
}
