import { Box, Image } from "@chakra-ui/react";

export default function SelectedEntry(props) {
  const { imageUrl } = props;

  return (
    <Box maxHeight="100%">
      <Image maxHeight="100%" src={imageUrl} loading="eager" />
    </Box>
  );
}
