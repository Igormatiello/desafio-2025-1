import React from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";

interface NotificationProps {
  message: string;
  status: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, status, onClose }) => {
  return (
    <Box
      position="fixed"
      top="20px"
      left="50%"
      transform="translateX(-50%)"
      width="fit-content"
      padding="16px"
      backgroundColor={status === "success" ? "green.500" : "red.500"}
      color="white"
      borderRadius="md"
      boxShadow="lg"
      zIndex="1050"
    >
      <Text>{message}</Text>
      <CloseButton position="absolute" top="8px" right="8px" onClick={onClose} />
    </Box>
  );
};

export default Notification;
