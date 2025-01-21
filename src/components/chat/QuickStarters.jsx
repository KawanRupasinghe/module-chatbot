import { Box, Button, HStack, Text, useColorMode } from '@chakra-ui/react';
import themes from '../../utils/themes'; // Import themes

const QuickStarters = ({ onSelectQuickStarter }) => {
  // Define the quick starter messages
  const quickStarters = [
    'Make a questionnaire of 10 MCQs',
    'Explain the module content',
    'Make a summary of each lesson',
    'Draw a mind map',
  ];

  const { colorMode } = useColorMode(); // Get current color mode
  const theme = themes[colorMode]; // Access theme values for the current mode

  return (
    <Box
      padding="4"
      bg={colorMode === 'light' ? 'blue.50' : theme.cardBackground} // Blue.50 for light mode
      borderRadius="md"
      boxShadow={theme.cardShadow}
      borderColor={theme.borderColor}
    >
      <Text fontSize="md" fontWeight="bold" mb="4" color={theme.text}>
        What can I help you with?
      </Text>
      {/* Use HStack to display the buttons in a single line */}
      <HStack spacing="4" wrap="wrap" justify="center">
        {quickStarters.map((starter, idx) => (
          <Button
            key={idx}
            onClick={() => onSelectQuickStarter(starter)}
            colorScheme={theme.buttonColorScheme}
            variant="solid"
            size="sm" // Keep the previous size
            padding="10px" // Adjusted padding to make the button smaller
            width="250px" // Allow the button to adjust width based on content
            maxWidth="500px" // Limit the max width of the button
            bg={colorMode === 'light' ? 'blue.100' : theme.buttonBackground} // Lighter button background in light mode
            _hover={{
              bg: colorMode === 'light' ? 'blue.200' : theme.buttonHover,
            }}
            color={colorMode === 'light' ? 'blue.800' : theme.text} // Darker text for light mode
          >
            {starter}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default QuickStarters;
