import { useEffect, useState } from "react";
import { Box, Heading, VStack, Text, Button, Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import CursoService from "@/service/CursoService";
import { ICurso } from "@/commons/interfaces";

const MeusCursosProfessor = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const listarMeusCursos = async (): Promise<ICurso[]> => {
    try {
      return await CursoService.listarMeusCursos();
    } catch (error) {
      console.error("Erro ao listar meus cursos", error);
      return [];
    }
  };

  const desassociarCurso = async (cursoId: number) => {
    try {
      const sucesso = await CursoService.desassociarProfessorCurso(cursoId);
      if (sucesso) {
        setCursos(cursos.filter(curso => curso.id !== cursoId));
        toast({ title: "Desassociado com sucesso.", status: "success", duration: 5000, isClosable: true });
      } else {
        toast({ title: "Erro ao desassociar.", status: "error", duration: 5000, isClosable: true });
      }
    } catch (err) {
      console.error("Erro ao desassociar", err);
      toast({ title: "Erro ao desassociar.", status: "error", duration: 5000, isClosable: true });
    }
  };

  const abrirTurma = (cursoId: number) => {
    window.location.href = `/alunos/${cursoId}`;
  };
  
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await listarMeusCursos();
        setCursos(data);
      } catch (err) {
        setError("Erro ao carregar seus cursos.");
        toast({ title: "Erro ao carregar cursos", status: "error", duration: 5000, isClosable: true });
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, [toast]);

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading mb={5} textAlign="center">Meus Cursos</Heading>
      {loading && <Spinner size="xl" display="block" mx="auto" />}
      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
      <VStack spacing={4} align="stretch">
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <Box key={curso.id} p={4} borderWidth={1} borderRadius="md" shadow="md">
              <Text fontSize="xl" fontWeight="bold">{curso.nome}</Text>
              <Text mt={2}>Assunto: {curso.assunto}</Text>
              <Text mt={1}>Encontros: {curso.encontros}</Text>
              <Text mt={1}>Status: {curso.status}</Text>
              <Button mt={3} colorScheme="blue">Detalhes</Button>
              <Button mt={3} colorScheme="red" onClick={() => desassociarCurso(curso.id)}>Sair do Curso</Button>
              <Button mt={3} colorScheme="green" onClick={() => abrirTurma(curso.id)}>Abrir Turma</Button>
            </Box>
          ))
        ) : (
          !loading && <Text textAlign="center">Você ainda não tem cursos associados.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default MeusCursosProfessor;
