import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi'; // Import sun and moon icons from react-icons
import themes from '../../utils/themes'; // Import the themes file from src/utils

const ChatHeader = ({ moduleName, userEmail }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI color mode hooks

  return (
    <Box
      width="100%"
      bg={colorMode === 'light' ? themes.light.background : themes.dark.background} // Use colors from themes.js
      boxShadow="sm"
      padding="4"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Display the module name or default to 'Chatbot' */}
      <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? themes.light.text : themes.dark.text}>
        {moduleName || 'Chatbot'}
      </Text>
      <HStack spacing={4}>
        {/* Theme toggle button with Sun and Moon icons */}
        <IconButton
          size="lg"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          aria-label="Toggle theme"
          onClick={toggleColorMode}
          variant="ghost"
          colorScheme={colorMode === 'light' ? 'blue' : 'gray'} // Keep the button color scheme consistent with the header's color
          _hover={{
            bg: colorMode === 'light' ? 'blue.200' : 'gray.600', // Adjust hover background for both modes
          }}
        />
        
        {/* Popover for user profile */}
        <Popover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Avatar
              name="User"
              src=""
              size="sm"
              bg="gray.300"
              _hover={{ transform: 'scale(1.1)', transition: 'transform 0.3s ease' }}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)} // Toggle popover visibility on click
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <Box p={4}>
              <Text fontSize="md" color={colorMode === 'light' ? themes.light.text : themes.dark.text}>
                {userEmail} {/* Display the user's email */}
              </Text>
            </Box>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  );
};

export default ChatHeader;
