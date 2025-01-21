import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import themes from '../utils/themes'; // Import themes from the themes file
import { signInWithGoogle } from './firebase'; // Import Firebase functions

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { colorMode } = useColorMode(); // Chakra UI hook to determine the current color mode

  const handleLogin = () => {
    navigate('/dashboard', { state: { userEmail: emailOrUsername } });
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      navigate('/dashboard', { state: { userEmail: user.email } });
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  const currentTheme = themes[colorMode]; // Access the current theme based on the color mode

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={currentTheme.background} // Use background from the current theme
      marginTop="-28"
    >
      <VStack
        spacing={6}
        align="stretch"
        width="100%"
        maxWidth="400px"
        padding={6}
        borderRadius="md"
        boxShadow={currentTheme.cardShadow} // Apply shadow based on theme
        bg={currentTheme.cardBackground} // Set card background from theme
      >
        <Heading as="h2" size="lg" textAlign="center" color={currentTheme.text}>
          Student Login
        </Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="emailOrUsername" color={currentTheme.text}>
            Email/Username
          </FormLabel>
          <Input
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter your email or username"
            focusBorderColor={currentTheme.inputFocusBorderColor}
            type="text"
            color={currentTheme.inputText} // Set input text color
            bg={currentTheme.inputBackground} // Set input background
            border="2px solid"
            borderColor={currentTheme.borderColor} // Set border color
            _hover={{ borderColor: currentTheme.inputFocusBorderColor }} // Change border color on hover
            _focus={{ borderColor: currentTheme.inputFocusBorderColor }} // Change border color on focus
            placeholderColor={currentTheme.inputPlaceholderColor} // Set placeholder text color
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password" color={currentTheme.text}>
            Password
          </FormLabel>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            focusBorderColor={currentTheme.inputFocusBorderColor}
            type="password"
            color={currentTheme.inputText}
            bg={currentTheme.inputBackground}
            border="2px solid"
            borderColor={currentTheme.borderColor}
            _hover={{ borderColor: currentTheme.inputFocusBorderColor }}
            _focus={{ borderColor: currentTheme.inputFocusBorderColor }}
            placeholderColor={currentTheme.inputPlaceholderColor}
          />
        </FormControl>

        <Button onClick={handleLogin} colorScheme={currentTheme.buttonColorScheme} size="lg" width="100%" bg={currentTheme.buttonBackground} _hover={{ bg: currentTheme.buttonHover }}>
          Login
        </Button>

        <Text textAlign="center" color={currentTheme.text}>or</Text>

        <Button
          onClick={handleGoogleSignIn}
          colorScheme={currentTheme.buttonColorScheme}
          size="lg"
          width="100%"
          variant="outline"
          color={currentTheme.text}
          borderColor={currentTheme.borderColor}
          _hover={{ borderColor: currentTheme.inputFocusBorderColor }}
        >
          Sign in with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
