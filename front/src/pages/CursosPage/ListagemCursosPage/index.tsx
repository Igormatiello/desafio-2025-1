import { useEffect, useState } from "react";
import CursoService from "@/service/CursoService";
import { ICurso } from "@/commons/interfaces";
import { Box, Text, Heading, SimpleGrid, Center } from "@chakra-ui/react";

export default function CursosPage() {
  const [cursos, setCursos] = useState<ICurso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const data = await CursoService.listarCursosAtivos();
      setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <Box p={4}>
      {cursos.length === 0 ? (
        <Center h="50vh">
          <Text fontSize="xl" fontWeight="bold">
            Ainda nenhum curso disponível
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {cursos.map((curso) => (
            <Box key={curso.id} p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="md">{curso.nome}</Heading>
              <Text>Assunto: {curso.assunto}</Text>
              <Text>Encontros: {curso.encontros}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
