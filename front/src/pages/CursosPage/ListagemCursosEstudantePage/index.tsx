import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link
import CursoService from "@/service/CursoService";
import { ICurso } from "@/commons/interfaces";
import { Box, Text, Heading, SimpleGrid, Button, Center, useToast } from "@chakra-ui/react";

export default function CursosEstudantePage() {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [meusCursos, setMeusCursos] = useState<ICurso[]>([]);
  const toast = useToast(); // Hook para exibir notificações

  useEffect(() => {
    const fetchCursos = async () => {
      const cursosAtivos = await CursoService.listarCursosAtivos();
      setCursos(cursosAtivos);

      const cursosDoEstudante = await CursoService.listarMeusCursosEstudante();
      setMeusCursos(cursosDoEstudante);
    };
    fetchCursos();
  }, []);

  const entrarNoCurso = async (cursoId: number) => {
    const resposta = await CursoService.entrarNoCurso(cursoId);

    if (resposta) {
      // Atualiza a lista de meusCursos dinamicamente
      setMeusCursos((prevCursos) => [...prevCursos, resposta.curso]);
      
      // Atualiza a lista de cursos (para que o curso apareça como inscrito)
      setCursos((prevCursos) =>
        prevCursos.map((curso) =>
          curso.id === cursoId
            ? { ...curso, jaEstaNoCurso: true } // Adiciona um flag para indicar que o curso foi ingressado
            : curso
        )
      );

      // Exibe a notificação de sucesso
      toast({
        title: "Você entrou no curso!",
        description: `Você foi inscrito no curso ${resposta.curso.nome}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Exibe a notificação de erro
      toast({
        title: "Erro ao entrar no curso",
        description: "Não foi possível realizar a inscrição no curso.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
          {cursos.map((curso) => {
            const jaEstaNoCurso = meusCursos.some((meuCurso) => meuCurso.id === curso.id);

            return (
              <Box key={curso.id} p={4} borderWidth="1px" borderRadius="lg">
                <Heading size="md">{curso.nome}</Heading>
                <Text>Assunto: {curso.assunto}</Text>
                <Text>Encontros: {curso.encontros}</Text>

                {jaEstaNoCurso ? (
                  <Box mt={4}>
                    <Text color="green.500">Você já está inscrito neste curso</Text>
                    <Button mt={2} colorScheme="blue" w="full" mb={2}>
                      Ver Notas
                    </Button>
                    {/* Link para a página de Aulas do curso */}
                    <Link to={`/aulas_estudante/${curso.id}`}>
                      <Button mt={2} colorScheme="green" w="full">
                        Ver Frequência
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => entrarNoCurso(curso.id)}
                    w="full"
                  >
                    Entrar no Curso
                  </Button>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}
