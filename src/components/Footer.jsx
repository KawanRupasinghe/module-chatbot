import { Box, Text, useColorMode } from '@chakra-ui/react';
import themes from '../utils/themes'; // Import themes for color modes

const Footer = () => {
  const { colorMode } = useColorMode(); // Chakra UI color mode hook

  return (
    <Box
      width="100%"
      bg={colorMode === 'light' ? 'blue.200' : themes.dark.background} // Adjust background for dark mode
      boxShadow="sm"
      padding="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="sticky"
      bottom="0"
    >
      <Text
        fontSize="md"
        color={colorMode === 'light' ? 'white' : themes.dark.text} // Adjust text color for dark mode
      >
        &copy; {new Date().getFullYear()} Chatbot Application. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
