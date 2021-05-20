import React from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Box,
  useDisclosure,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export default function UpdateEntryModal(props) {
  const { handleSubmit, comments, handleCommentsChange, entry } = props;
  const wrongDate = new Date(entry.recorded_at);
  // Recorded date is being sent wrong by the backend :(
  const date = new Date(wrongDate.getTime() - 3 * 60 * 60 * 1000);
  const dateTxt = date.toLocaleString();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  return (
    <Box position="absolute" top="90px" left="50px">
      <Button
        backgroundColor="gray.200"
        borderRadius="2xl"
        fontSize="xl"
        fontWeight="bold"
        padding="30px"
        zIndex="2"
        onClick={onOpen}
        rightIcon={<ChatIcon />}
      >
        {dateTxt}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Processed at</FormLabel>
              <Input value={dateTxt} isDisabled></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Comments</FormLabel>
              <Textarea
                ref={initialRef}
                value={comments}
                onChange={handleCommentsChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e) => {
                handleSubmit(e);
                onClose(e);
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
