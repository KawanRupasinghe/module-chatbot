import { Box, Button, Icon, Image, Text, VStack, useColorMode } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa'; // For microphone (voice message) icon
import themes from '../../utils/themes'; // Import themes
import Searchbar from './Searchbar'; // Import Searchbar component

const ChatHistorySidebar = ({ history, onRevisitChat, searchQuery, setSearchQuery, onNewChat }) => {
  const { colorMode } = useColorMode(); // Get current theme mode (light/dark)
  const currentTheme = themes[colorMode]; // Get theme based on the current mode

  // Helper function to display the first message content
  const getFirstMessageContent = (chat) => {
    const firstMessage = chat.messages[0];
    if (firstMessage.text) {
      return firstMessage.text; // If it's text, return the text
    } else if (firstMessage.image) {
      return (
        <Image
          src={firstMessage.image}
          alt="Attachment"
          boxSize="30px"
          objectFit="cover"
          borderRadius="md"
        />
      );
    } else if (firstMessage.voice) {
      return <Icon as={FaMicrophone} w={5} h={5} color={currentTheme.text} />;
    }
    return 'No content';
  };

  return (
    <Box
      border="1px"
      borderLeftColor={currentTheme.borderColor}
      borderRightColor={currentTheme.borderColor}
      padding="4"
      width="300px"
      height="100vh"
      bg={`linear-gradient(180deg, ${currentTheme.background} 0%, ${currentTheme.cardBackground} 100%)`} // Gradient added here
      boxShadow={currentTheme.cardShadow}
      sx={{
        borderTop: 'none', // Remove top border
        borderBottom: 'none', // Remove bottom border
        position: 'sticky', // Make the sidebar sticky
        top: '0', // Stick to the top of the viewport
      }}
    >
      {/* Search Bar Section */}
      <VStack spacing={4} align="stretch">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Start New Chat Button */}
        <Button
          bg={currentTheme.buttonBackground}
          _hover={{ bg: currentTheme.buttonHover }}
          color={currentTheme.text}
          size="sm"
          onClick={onNewChat}
          marginBottom="4"
        >
          + New Chat
        </Button>
        
        <Text fontWeight="bold" fontSize="xl" color={currentTheme.text}>
          Chat History
        </Text>
      </VStack>

      {/* Chat History Section with scrollable area */}
      <Box maxHeight="80vh" overflowY="auto" paddingRight="4">
        {history.length === 0 ? (
          <Text fontSize="sm" color="gray.600">
            No previous chats.
          </Text>
        ) : (
          history.map((chat, idx) => (
            <Box
              key={idx}
              onClick={() => onRevisitChat(chat)} // On click, revisit this chat
              cursor="pointer"
              marginBottom="2"
              padding="4"
              borderRadius="md"
              boxShadow="sm"
              bg={currentTheme.cardBackground}
              _hover={{ bg: currentTheme.buttonHover, transform: 'scale(1.03)' }}
              transition="all 0.3s ease-in-out"
            >
              <Text
                fontSize="sm"
                marginBottom="1"
                padding="2"
                borderRadius="md"
                bg={currentTheme.cardBackground}
                boxShadow="sm"
                color={currentTheme.text}
                wordBreak="break-word"
              >
                {/* Display the first message content */}
                {getFirstMessageContent(chat)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {/* Display the timestamp */}
                {chat.timestamp}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ChatHistorySidebar;
