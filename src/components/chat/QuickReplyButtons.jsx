import { Button, HStack, useColorMode } from '@chakra-ui/react';
import React from 'react';
import themes from '../../utils/themes'; // Import your theme

const QuickReplyButtons = ({ quickReplies, handleSendMessage }) => {
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)
  const theme = themes[colorMode]; // Access current theme based on colorMode

  const handleClick = (reply) => {
    handleSendMessage(reply); // Pass the reply directly to handleSendMessage
  };

  return (
    <HStack spacing={4} padding="2" bg={theme.background}>
      {quickReplies.map((reply, idx) => (
        <Button
          key={idx}
          onClick={() => handleClick(reply)} // Use handleClick to pass the reply
          bg={theme.buttonBackground}
          _hover={{ bg: theme.buttonHover }}
          color={theme.text}
          size="sm"
        >
          {reply}
        </Button>
      ))}
    </HStack>
  );
};

export default QuickReplyButtons;
