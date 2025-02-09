import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Spinner, Text, VStack, Card, CardBody, Badge } from "@chakra-ui/react";
import { listarAulasDoCurso } from "@/service/AulaPresencaService";
import { listarMinhasPresencasNoCurso } from "@/service/AulaPresencaService"; // Ajuste o caminho conforme necessário

interface ICursoAula {
  id: number;
  cursoId: number;
  titulo: string;
  descricao?: string;
  dataAula: string;
}

const AlunoAulasPage = () => {
  const { id } = useParams<{ id: string }>();
  const [aulas, setAulas] = useState<ICursoAula[]>([]);
  const [presencas, setPresencas] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Carregar as aulas do curso
      Promise.all([
        listarAulasDoCurso(parseInt(id)),
        listarMinhasPresencasNoCurso(parseInt(id)),
      ])
        .then(([aulasResponse, presencasResponse]) => {
          setAulas(aulasResponse);
          setPresencas(presencasResponse);
        })
        .catch((error) => {
          console.error("Erro ao listar aulas ou presenças:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Heading mb={6}>Aulas do Curso</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : aulas.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {aulas.map((aula) => {
            // Verificar se a aula está na lista de presenças
            const aulaData = new Date(aula.dataAula).toLocaleDateString();
            const estaPresente = presencas.some((presenca) => new Date(presenca).toLocaleDateString() === aulaData);

            return (
              <Card key={aula.id} boxShadow="md" p={4} borderRadius="lg">
                <CardBody>
                  <Heading size="md">{aula.titulo}</Heading>
                  <Text mt={2}>{aula.descricao || "Sem descrição"}</Text>
                  <Text fontSize="sm" color="gray.500">{new Date(aula.dataAula).toLocaleDateString()}</Text>
                  {/* Mostrar badge de presença */}
                  <Badge mt={2} colorScheme={estaPresente ? "green" : "red"}>
                    {estaPresente ? "Presente" : "Ausente"}
                  </Badge>
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      ) : (
        <Text>Nenhuma aula encontrada para este curso.</Text>
      )}
    </Box>
  );
};

export default AlunoAulasPage;
