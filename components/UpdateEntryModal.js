import React from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export default function UpdateEntryModal(props) {
  const { handleSubmit, comments, handleCommentsChange } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  return (
    <>
      <Text>
        Comments <IconButton onClick={onOpen} icon={<ChatIcon />} size="sm" />
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
    </>
  );
}
