import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import themes from '../../utils/themes'; // Import your custom themes
import ChatHeader from './ChatHeader';
import ChatHistorySidebar from './ChatHistorySidebar';
import ChatInputSection from './ChatInputSection';
import QuickReplyButtons from './QuickReplyButtons'; // Import the QuickReplyButtons component
import QuickStarters from './QuickStarters'; // Import the QuickStarters component

const ChatWindow = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State for image preview modal
  const [previewImage, setPreviewImage] = useState(null); // State for the preview image
  const [quickReplies, setQuickReplies] = useState(['Yes', 'No', 'Define', 'Explain']); // Default quick replies

  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)

  useEffect(() => {
    if (state && state.userEmail) {
      setUserEmail(state.userEmail);
    }
  }, [state]);

  const handleSendMessage = (messageText) => {
    const textToSend = messageText || message.trim(); // Use the reply or typed message

    if (textToSend || image) {
      const newMessage = {
        sender: 'user',
        text: textToSend,
        image: image,
      };

      const botMessage = {
        sender: 'bot',
        text: `You sent: ${textToSend || 'an image'}`,
        image: null,
      };

      setChatHistory([...chatHistory, newMessage, botMessage]);
      setMessage(''); // Reset message field if using quick reply
      setImage(null); // Reset image after sending
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Set preview image state
        setIsPreviewOpen(true); // Open the preview modal
      };
      reader.readAsDataURL(file);
    }

    // Reset the file input so that the same file can be selected again
    event.target.value = null;
  };

  const handleNewChat = () => {
    if (chatHistory.length > 0) {
      const timestamp = new Date().toLocaleString();
      setAllChats([
        ...allChats,
        { firstMessage: chatHistory[0], timestamp, messages: chatHistory },
      ]);
    }
    setChatHistory([]);
  };

  const handleRevisitChat = (chat) => {
    setChatHistory(chat.messages);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = allChats.filter((chat) =>
    chat.firstMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current theme values based on the color mode (light or dark)
  const theme = themes[colorMode]; // Access current theme based on colorMode

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh" bg={theme.background}>
      <ChatHistorySidebar
        history={filteredChats}
        onRevisitChat={handleRevisitChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewChat={handleNewChat}
      />

      <VStack width="100%" flex="1" align="stretch" position="relative">
        <ChatHeader moduleName={state?.moduleName} userEmail={userEmail} />

        {/* Quick Starters Section */}
        <QuickStarters onSelectQuickStarter={handleSendMessage} />

        {/* Chat History */}
        <Box flex="1" padding="4" overflowY="auto" bg={theme.background}>
          {chatHistory.map((msg, idx) => (
            <Box
              key={idx}
              display="flex"
              justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              marginBottom="2"
            >
              <VStack align="start">
                {msg.text && (
                  <Text
                    wordBreak="break-word"
                    fontSize="lg"
                    padding="8px"
                    borderRadius="md"
                    bg={msg.sender === 'user' ? theme.buttonBackground : 'gray.200'}
                    color={msg.sender === 'user' ? theme.text : 'gray.800'}
                    textAlign="left"
                  >
                    {msg.text}
                  </Text>
                )}
                {msg.image && (
                  <Image
                    src={msg.image}
                    alt="Sent"
                    borderRadius="md"
                    maxWidth="200px"
                  />
                )}
              </VStack>
            </Box>
          ))}
        </Box>

        {/* Quick Reply Buttons placed just above the input section */}
        <QuickReplyButtons quickReplies={quickReplies} handleSendMessage={handleSendMessage} />

        {/* Input Section */}
        <ChatInputSection
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleImageUpload={handleImageUpload}
        />

        {/* Image Preview Modal */}
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Preview Attachment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width="100%"
                  maxHeight="400px"
                  objectFit="contain"
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme={theme.buttonColorScheme}
                mr={3}
                onClick={() => {
                  setImage(previewImage);
                  setIsPreviewOpen(false);
                }}
              >
                Send
              </Button>
              <Button variant="ghost" onClick={() => setIsPreviewOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default ChatWindow;
