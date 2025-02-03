import { Box, SimpleGrid, Heading, Text, Flex } from '@chakra-ui/react';

export function HomePage() {
  // Dados fictícios para os cards
  const cards = [
    { title: 'Total de Usuários', value: '1500', description: 'Número total de usuários cadastrados' },
    { title: 'Novos Cadastros', value: '200', description: 'Usuários cadastrados nesta semana' },
    { title: 'Transações', value: '3.000', description: 'Total de transações realizadas' },
    { title: 'Feedbacks Positivos', value: '95%', description: 'Percentual de feedbacks positivos' },
    { title: 'Taxa de Crescimento', value: '10%', description: 'Crescimento em relação ao mês anterior' },
    { title: 'Visitas', value: '12.000', description: 'Total de visitas no sistema' },
    { title: 'Tempo Médio', value: '5 min', description: 'Tempo médio de permanência dos usuários' },
    { title: 'Satisfação', value: '4.5/5', description: 'Média de avaliação dos usuários' },
  ];

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Box p={8}>
        <Heading as="h1" mb={6} textAlign="center">
          Dashboard Analítico
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {cards.map((card, index) => (
            <Box
              key={index}
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: 'lg' }}
            >
              <Heading as="h3" size="md" mb={2}>
                {card.title}
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                {card.value}
              </Text>
              <Text color="gray.600">{card.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
