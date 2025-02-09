import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Input, Card, CardBody, Text, FormLabel, FormControl, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { listarAulasDoCurso, lancarCursoAula,lancarPresencas } from "@/service/AulaPresencaService";
import { listarAlunosDoCurso  } from "@/service/CursoService";
import { ICursoAula, IPessoa } from "@/commons/interfaces";

const CursoAulas = () => {
  const { id } = useParams<{ id: string }>(); // Pega o id do curso da URL
  const [aulas, setAulas] = useState<ICursoAula[]>([]);
  const [alunos, setAlunos] = useState<IPessoa[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataAula, setDataAula] = useState("");
  const [presencas, setPresencas] = useState<{ [key: number]: boolean }>({});
  const toast = useToast(); // Usado para exibir as notificações
  const { isOpen, onClose } = useDisclosure(); // Hook para controlar o modal
  const { isOpen: isOpenPresenca, onOpen: onOpenPresenca, onClose: onClosePresenca } = useDisclosure(); // Modal para frequência
  const [aulaSelecionada, setAulaSelecionada] = useState<ICursoAula | null>(null);

  useEffect(() => {
    const carregarAulas = async () => {
      const aulasCarregadas = await listarAulasDoCurso(Number(id));
      setAulas(aulasCarregadas);
    };
    carregarAulas();
  }, [id]);

  useEffect(() => {
    const carregarAlunos = async () => {
      const alunosCarregados = await listarAlunosDoCurso(Number(id));
      setAlunos(alunosCarregados);
    };
    carregarAlunos();
  }, [id]);

  const handleAdicionarAula = async () => {
    if (!titulo.trim() || !dataAula.trim() || !descricao.trim()) {
      toast({
        title: "Erro",
        description: "Todos os campos devem ser preenchidos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Verifica se a data está no formato correto (YYYY-MM-DD)
    const dataObj = new Date(dataAula);
    if (isNaN(dataObj.getTime())) {
      toast({
        title: "Erro",
        description: "Data inválida. Por favor, insira uma data válida.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Formata para o formato "YYYY-MM-DD" (somente dia, mês e ano)
    const dataISO = dataObj.toISOString().split("T")[0];

    // Verifica se já existe uma aula cadastrada na mesma data
    if (aulas.some((aula) => aula.data === dataISO)) {
      toast({
        title: "Erro",
        description: "Já existe uma aula cadastrada nesta data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const novaAula: ICursoAula = {
      id: 0,
      cursoId: Number(id), // Envia o cursoId da URL
      titulo,
      descricao,
      data: dataISO, // Utiliza o formato "YYYY-MM-DD"
    };

    // Chama a função para lançar a aula no serviço
    const aulaCriada = await lancarCursoAula(novaAula);
    if (aulaCriada) {
      setAulas([...aulas, aulaCriada]);
      setTitulo("");
      setDescricao("");
      setDataAula("");
      onClose(); // Fecha o modal após criar a aula

      toast({
        title: "Sucesso",
        description: "Aula cadastrada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLancarPresencas = async (cursoAulaId: number) => {
    const estudantesIds = alunos.filter((aluno) => presencas[aluno.id]).map((aluno) => aluno.id);
  
    if (estudantesIds.length > 0) {
      const sucesso = await lancarPresencas(cursoAulaId, estudantesIds);
      if (sucesso) {
        toast({
          title: "Sucesso",
          description: "Presença lançada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClosePresenca(); // Fecha o modal de presença
      } else {
        toast({
          title: "Erro",
          description: "Erro ao lançar presença. Tente novamente.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro",
        description: "Nenhum aluno selecionado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold">Aulas do Curso {id}</Text>

      {/* Lista de aulas */}
      <Box mt={4}>
        {aulas.map((aula) => (
          <Card key={aula.id} mb={4} boxShadow="md">
            <CardBody>
              <Box mb={2}>
                <Text fontSize="lg" fontWeight="semibold">Título:</Text>
                <Text>{aula.titulo}</Text>
              </Box>
              <Box mb={2}>
                <Text fontSize="lg" fontWeight="semibold">Descrição:</Text>
                <Text>{aula.descricao}</Text>
              </Box>
              <Box mb={2}>
                <Text fontSize="lg" fontWeight="semibold">Data:</Text>
                <Text>{format(parseISO(aula.data), "dd/MM/yyyy")}</Text>
              </Box>

              {/* Botão para lançar presença */}
              <Button
  onClick={() => {
    setPresencas({});
    setAulaSelecionada(aula); // Define a aula selecionada
    onOpenPresenca();
  }}
  colorScheme="green"
  mt={2}
>
  Lançar Frequência
</Button>
            </CardBody>
          </Card>
        ))}
      </Box>

      {/* Modal para adicionar nova aula */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Nova Aula</ModalHeader>
          <ModalBody>
            <FormControl mt={2} isRequired>
              <FormLabel htmlFor="titulo">Título</FormLabel>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título da aula"
              />
            </FormControl>

            <FormControl mt={2} isRequired>
              <FormLabel htmlFor="descricao">Descrição</FormLabel>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição da aula"
              />
            </FormControl>

            <FormControl mt={2} isRequired>
              <FormLabel htmlFor="dataAula">Data da Aula</FormLabel>
              <Input
                id="dataAula"
                type="date"
                value={dataAula}
                onChange={(e) => setDataAula(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" onClick={handleAdicionarAula} ml={3}>
              Adicionar Aula
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenPresenca} onClose={onClosePresenca}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Lançar Frequência - {aulaSelecionada?.titulo}</ModalHeader>
    <ModalBody>
      {aulaSelecionada && alunos.map((aluno) => (
        <Box key={aluno.id} mt={2}>
          <Checkbox
            isChecked={presencas[aluno.id] || false}
            onChange={(e) => setPresencas((prev) => ({ ...prev, [aluno.id]: e.target.checked }))} 
          >
            {aluno.nome}
          </Checkbox>
        </Box>
      ))}
    </ModalBody>

    <ModalFooter>
      <Button variant="ghost" onClick={onClosePresenca}>Cancelar</Button>
      <Button
        colorScheme="green"
        onClick={() => handleLancarPresencas(aulaSelecionada.id)}
        ml={3}
      >
        Salvar Frequência
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default CursoAulas;
