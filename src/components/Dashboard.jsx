import { Box, Grid, GridItem, Heading, Image, Link, VStack, useColorMode } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import themes from '../utils/themes'; // Import the themes for color modes

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail; // Access the passed email from LoginForm
  const { colorMode } = useColorMode(); // Chakra UI color mode hook

  const handleModuleSelection = (moduleId, moduleName) => {
    navigate(`/chat/${moduleId}`, { state: { moduleName } });
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={colorMode === 'light' ? themes.light.background : themes.dark.background} // Adjust background color
      marginTop="-28"
    >
      <VStack
        spacing={6}
        width="100%"
        maxWidth="1200px"
        padding={6}
        bg={colorMode === 'light' ? 'white' : themes.dark.cardBackground} // Adjust card background
        borderRadius="md"
        boxShadow="lg"
      >
        {/* Title Section */}
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          color={colorMode === 'light' ? themes.light.text : themes.dark.text} // Adjust title text color
        >
          {userEmail ? `Welcome, ${userEmail}` : 'Select a Module'}
        </Heading>

        {/* Grid for Modules */}
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={6}
          width="100%"
          alignItems="center"
          justifyItems="center"
        >
          {[
            {
              name: 'Object Oriented Analysis and Design',
              image: 'ooad.jpg',
              moduleId: 'module1',
            },
            {
              name: 'Design and Analysis of Algorithms',
              image: 'daa.jpg',
              moduleId: 'module2',
            },
            {
              name: 'Probability and Statistics',
              image: 'ps.avif',
              moduleId: 'module3',
            },
            {
              name: 'Computer Networks',
              image: 'cn.jpg',
              moduleId: 'module4',
            },
            {
              name: 'Database Management Systems',
              image: 'dms.jpg',
              moduleId: 'module5',
            },
          ].map((module) => (
            <GridItem
              key={module.moduleId}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <Image
                src={module.image}
                alt={module.name}
                objectFit="cover"
                boxSize="150px"
                borderRadius="md"
                boxShadow="md"
              />
              <Link
                onClick={() => handleModuleSelection(module.moduleId, module.name)}
                textAlign="center"
                fontSize="lg"
                color={colorMode === 'light' ? 'blue.700' : 'blue.200'} // Adjust link color
                fontWeight="bold"
                mt={2}
                _hover={{
                  textDecoration: 'underline',
                  color: colorMode === 'light' ? 'blue.900' : 'blue.300',
                }}
              >
                {module.name}
              </Link>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
