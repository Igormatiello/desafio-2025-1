import { useEffect, useState } from "react";
import { Box, Heading, Button, Spinner, Alert, AlertIcon, useToast, Input, FormControl, FormLabel } from "@chakra-ui/react";
import EnderecoService from "@/service/EnderecoService"; // Ajuste o caminho conforme necessário
import { EnderecoDTO } from "@/commons/interfaces"; // Ajuste o caminho conforme necessário

const MeusEnderecos = () => {
  const [enderecos, setEnderecos] = useState<EnderecoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEndereco, setCurrentEndereco] = useState<EnderecoDTO | null>(null); // Para armazenar o endereço em edição
  const [newEndereco, setNewEndereco] = useState<EnderecoDTO>({
    cidade: "",
    cep: "",
    rua: "",
    numero: 0,
  });
  const toast = useToast();

  // Função para carregar os endereços
  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await EnderecoService.listarEnderecos();
        setEnderecos(response); // Atualiza o estado com os endereços recebidos
      } catch (err) {
        setError("Erro ao carregar os endereços.");
        toast({
          title: "Erro ao carregar os endereços",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnderecos();
  }, []);

  // Função para salvar ou editar o endereço
  const handleSalvarEndereco = async (enderecoDTO: EnderecoDTO) => {
    try {
      const result = await EnderecoService.salvarOuEditarEndereco(enderecoDTO);
      if (result) {
        toast({
          title: "Endereço salvo com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Após salvar, recarregue a lista de endereços
        const updatedEnderecos = await EnderecoService.listarEnderecos();
        setEnderecos(updatedEnderecos);
        setIsEditing(false); // Desativa o modo de edição
        setCurrentEndereco(null); // Limpa o endereço em edição
      } else {
        toast({
          title: "Erro ao salvar o endereço",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError("Erro ao salvar o endereço.");
      toast({
        title: "Erro ao salvar o endereço",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Função para lidar com as mudanças no formulário de novo endereço
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentEndereco) {
      setCurrentEndereco((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewEndereco((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Função para iniciar a edição de um endereço
  const handleEditarEndereco = (endereco: EnderecoDTO) => {
    setIsEditing(true);
    setCurrentEndereco(endereco);
  };

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading mb={5} textAlign="center">Meus Endereços</Heading>

      {loading && <Spinner size="xl" display="block" mx="auto" />}

      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}

      {enderecos.length === 0 && !loading ? (
        <>
          <Alert status="info" mb={4}>
            <AlertIcon />
            Nenhum endereço encontrado. Você pode adicionar um novo endereço abaixo.
          </Alert>

          {isEditing ? (
            <Box>
              <FormControl mb={4}>
                <FormLabel>Cidade</FormLabel>
                <Input
                  type="text"
                  name="cidade"
                  value={currentEndereco ? currentEndereco.cidade : newEndereco.cidade}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>CEP</FormLabel>
                <Input
                  type="text"
                  name="cep"
                  value={currentEndereco ? currentEndereco.cep : newEndereco.cep}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Rua</FormLabel>
                <Input
                  type="text"
                  name="rua"
                  value={currentEndereco ? currentEndereco.rua : newEndereco.rua}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Número</FormLabel>
                <Input
                  type="number"
                  name="numero"
                  value={currentEndereco ? currentEndereco.numero : newEndereco.numero}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={() => handleSalvarEndereco(currentEndereco || newEndereco)}>
                {currentEndereco ? "Salvar Edição" : "Salvar Endereço"}
              </Button>
            </Box>
          ) : (
            <Button colorScheme="blue" mt={4} onClick={() => setIsEditing(true)}>
              Adicionar Novo Endereço
            </Button>
          )}
        </>
      ) : (
        <Box mt={5}>
          {enderecos.map((endereco, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md" shadow="md" mb={3}>
              <Heading size="md" mb={2}>{endereco.rua}</Heading>
              <p>{endereco.numero}</p>
              <p>{endereco.cidade}</p>
              <p>{endereco.cep}</p>
              <Button colorScheme="blue" onClick={() => handleEditarEndereco(endereco)}>Editar</Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MeusEnderecos;
