import AppRoutes from './routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

const App = () => {
  return (
      <MainContent />
  );
};

const MainContent = () => {
  const location = useLocation();
  const isChatWindow = location.pathname.startsWith('/chat');

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {!isChatWindow && <Header />}
      <Box flex="1">
        <AppRoutes />
      </Box>
      {!isChatWindow && <Footer />}
    </Box>
  );
};

export default App;
