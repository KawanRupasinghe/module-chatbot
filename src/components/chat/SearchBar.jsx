import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Icon, Input, useColorMode } from '@chakra-ui/react';
import themes from '../../utils/themes'; // Import themes

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  const { colorMode } = useColorMode(); // Get the current color mode

  // Select the appropriate theme based on the current color mode
  const theme = themes[colorMode];

  return (
    <HStack spacing={4} alignItems="center" width="100%">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search chats..."
        size="sm"
        width="200px"
        borderColor={theme.borderColor} // Use the theme's border color
        focusBorderColor={theme.inputFocusBorderColor} // Focus border color
        backgroundColor={theme.inputBackground} // Use theme input background color
        color={theme.inputText} // Use theme text color inside input
        _placeholder={{ color: theme.inputPlaceholderColor }} // Use theme's placeholder color
      />
      <Button colorScheme={theme.buttonColorScheme} size="sm">
        <Icon as={SearchIcon} color={theme.iconColor} />
      </Button>
    </HStack>
  );
};

export default Searchbar;
