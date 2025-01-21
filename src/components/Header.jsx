import {
  Avatar,
  Box,
  Button,
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
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi'; // Import sun and moon icons from react-icons
import { useLocation, useNavigate } from 'react-router-dom';
import themes from '../utils/themes'; // Import the themes for color modes
import { auth } from './firebase';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI color mode hooks

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      navigate('/'); // Redirect to login
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box
      width="100%"
      bg={colorMode === 'light' ? 'blue.200' : themes.dark.background} // Light mode uses blue.200 as the background
      boxShadow="sm"
      padding="4"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? 'white' : themes.dark.text}>
        Chatbot Application
      </Text>
      <HStack spacing={4}>
        {/* Dark Mode Toggle Button with Sun and Moon Icons */}
        <IconButton
          size="lg"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          aria-label="Toggle theme"
          onClick={toggleColorMode}
          variant="ghost"
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
              <Button
                colorScheme="blue"
                size="sm"
                width="100%"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  );
};

export default Header;
