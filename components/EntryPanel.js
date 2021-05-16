import { Box, Image } from "@chakra-ui/react";

export default function SelectedEntry(props) {
  const { imageUrl } = props;

  return (
    <Box>
      <Image src={imageUrl} htmlWidth="" loading="eager" />
    </Box>
  );
}
