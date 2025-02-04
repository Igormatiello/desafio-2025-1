import { useEffect, useState } from "react";
import { Box, Heading, VStack, Text, Button, Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import CursoService from "@/service/CursoService";
import { ICurso } from "@/commons/interfaces";

const ListagemCursosSemProfessor = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast(); // Hook para exibir notificações

  const handleAssociarProfessor = async (cursoId: number) => {
    try {
      await CursoService.associarProfessorCurso(cursoId);
      setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== cursoId));
      
      // Exibir notificação de sucesso
      toast({
        title: "Professor associado ao curso.",
        description: "O professor foi associado ao curso com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError("Erro ao entrar no curso como professor.");
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await CursoService.listarCursosSemProfessor();
        setCursos(data);
      } catch (err) {
        setError("Erro ao carregar cursos.");
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading mb={5} textAlign="center">Cursos Sem Professor</Heading>
      {loading && <Spinner size="xl" display="block" mx="auto" />}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing={4} align="stretch">
        {cursos.length > 0 ? (
          cursos.map((curso: ICurso) => (
            <Box key={curso.id} p={4} borderWidth={1} borderRadius="md" shadow="md">
              <Text fontSize="xl" fontWeight="bold">{curso.nome}</Text>
              <Text mt={2}>Assunto: {curso.assunto}</Text>
              <Text mt={1}>Encontros: {curso.encontros}</Text>
              <Text mt={1}>Status: {curso.status}</Text>
              <Button mt={3} colorScheme="blue">Detalhes</Button>
              <Button mt={3} ml={2} colorScheme="green" onClick={() => handleAssociarProfessor(curso.id)}>Entrar como Professor</Button>
            </Box>
          ))
        ) : (
          !loading && <Text textAlign="center">Nenhum curso disponível.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ListagemCursosSemProfessor;
