import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Button, Spinner, Alert, AlertIcon, useToast, HStack } from "@chakra-ui/react";
import CursoService from "@/service/CursoService";
import { IPessoa } from "@/commons/interfaces";

const MeusAlunosCursosProfessor = () => {
  const { id } = useParams<{ id?: string }>(); // Permitir que id seja undefined
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alunos, setAlunos] = useState<IPessoa[] | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) {
        setError("ID do curso não fornecido na URL.");
        setLoading(false);
        return;
      }

      try {
        const alunosList = await CursoService.listarAlunosDoCurso(Number(id));
        setAlunos(alunosList);
      } catch (error) {
        setError("Erro ao carregar alunos do curso.");
        toast({
          title: "Erro ao carregar alunos",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]); // Removido `toast` da lista de dependências

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading mb={5} textAlign="center">Alunos do Curso</Heading>
      {loading && <Spinner size="xl" display="block" mx="auto" />}
      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
      {alunos && (
        <Box mt={5} p={4} borderWidth={1} borderRadius="md" shadow="md">
          <Heading size="md" mb={3}>Alunos Inscritos</Heading>
          {alunos.length > 0 ? (
            alunos.map(aluno => (
              <HStack key={aluno.id} justify="space-between" p={2} borderWidth={1} borderRadius="md">
                <Text>{aluno.nome} - {aluno.email}</Text>
                <HStack>
                  <Button colorScheme="blue">Lançar Nota</Button>
                  <Button colorScheme="teal">Lançar Frequência</Button>
                </HStack>
              </HStack>
            ))
          ) : (
            <Text>Nenhum aluno inscrito neste curso.</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MeusAlunosCursosProfessor;
