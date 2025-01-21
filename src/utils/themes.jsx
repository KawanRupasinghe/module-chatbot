// src/utils/themes.js

const themes = {
  light: {
    background: 'blue.50',
    text: 'blue.800',
    cardBackground: 'white',
    cardShadow: 'sm',
    buttonBackground: 'blue.200',
    buttonHover: 'blue.300',
    borderColor: 'blue.300',
    inputBackground: 'white', // White background for inputs in light mode
    inputText: 'black', // Black text inside input in light mode
    inputPlaceholderColor: 'gray.500', // Placeholder text color
    inputFocusBorderColor: 'blue.500', // Focus border color for inputs
    buttonColorScheme: 'blue', // Button color scheme
    iconColor: 'blue.0', // Icon color for button
  },
  dark: {
    background: 'gray.800',
    text: 'gray.200', // Light text on dark background
    cardBackground: 'gray.700',
    cardShadow: 'md',
    buttonBackground: 'gray.600',
    buttonHover: 'gray.500',
    borderColor: 'gray.600',
    inputBackground: 'gray.600', // Dark background for inputs
    inputText: 'white', // Light text inside input
    inputPlaceholderColor: 'gray.300', // Placeholder text color
    inputFocusBorderColor: 'gray.500', // Focus border color for inputs
    buttonColorScheme: 'gray', // Button color scheme
    iconColor: 'gray.300', // Icon color for button
  },
};

export default themes;
