import { AttachmentIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    HStack,
    IconButton,
    Input,
    useColorMode,
} from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';
import themes from '../../utils/themes'; // Import themes

const ChatInputSection = ({ message, setMessage, handleSendMessage, handleVoiceInput, handleImageUpload }) => {
    const { colorMode } = useColorMode(); // Get current theme mode (light/dark)
    const currentTheme = themes[colorMode]; // Get theme based on the current mode

    return (
        <Box
            width="100%"
            bg={currentTheme.cardBackground}
            boxShadow={currentTheme.cardShadow}
            padding="4"
            position="sticky"
            bottom="0"
            borderTop={`1px solid ${currentTheme.borderColor}`}
        >
            <HStack spacing={4}>
                {/* Image Upload Button */}
                <IconButton
                    icon={<AttachmentIcon />}
                    bg={currentTheme.buttonBackground}
                    _hover={{ bg: currentTheme.buttonHover }}
                    color={currentTheme.text}
                    onClick={() => document.getElementById('image-upload').click()}
                    aria-label="Attach Image"
                />
                <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    display="none"
                    onChange={handleImageUpload}
                />

                {/* Voice Input Button */}
                <IconButton
                    icon={<FaMicrophone />}
                    bg={currentTheme.buttonBackground}
                    _hover={{ bg: currentTheme.buttonHover }}
                    color={currentTheme.text}
                    onClick={handleVoiceInput}
                    aria-label="Voice Input"
                />

                {/* Message Input Field */}
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Type your message..."
                    size="lg"
                    flex="1"
                    bg={currentTheme.background}
                    color={currentTheme.text}
                    borderColor={currentTheme.borderColor}
                    focusBorderColor={currentTheme.buttonHover}
                    _placeholder={{ color: currentTheme.text }}
                />

                {/* Send Button */}
                <Button
                    onClick={handleSendMessage}
                    bg={currentTheme.buttonBackground}
                    _hover={{ bg: currentTheme.buttonHover }}
                    color={currentTheme.text}
                    size="lg"
                >
                    Send
                </Button>
            </HStack>
        </Box>
    );
};

export default ChatInputSection;
