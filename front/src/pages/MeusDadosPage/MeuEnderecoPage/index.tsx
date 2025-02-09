import { useEffect, useState } from "react";
import { Box, Heading, Button, Spinner, Alert, AlertIcon, useToast, Input, FormControl, FormLabel } from "@chakra-ui/react";
import EnderecoService from "@/service/EnderecoService"; // Ajuste o caminho conforme necessário
import { EnderecoDTO } from "@/commons/interfaces"; // Ajuste o caminho conforme necessário

const MeusEnderecos = () => {
  const [endereco, setEndereco] = useState<EnderecoDTO>({
    cidade: "",
    cep: "",
    rua: "",
    numero: 0,
  });  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchEndereco = async () => {
      try {
        const response = await EnderecoService.listarEnderecos();
        if (response ) {
          setEndereco(response);
        }
      } catch (err) {
        setError("Erro ao carregar o endereço.");
        toast({
          title: "Erro ao carregar o endereço",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEndereco();
  }, []);

  const handleSalvarEndereco = async () => {
    try {
      const result = await EnderecoService.salvarOuEditarEndereco(endereco);
      if (result) {
        toast({
          title: "Endereço salvo com sucesso",
          status: "success",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Heading mb={5} textAlign="center">Meu Endereço</Heading>
      {loading && <Spinner size="xl" display="block" mx="auto" />}
      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
      <Box>
        <FormControl mb={4}>
          <FormLabel>Cidade</FormLabel>
          <Input type="text" name="cidade" value={endereco.cidade} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>CEP</FormLabel>
          <Input type="text" name="cep" value={endereco.cep} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Rua</FormLabel>
          <Input type="text" name="rua" value={endereco.rua} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Número</FormLabel>
          <Input type="number" name="numero" value={endereco.numero} onChange={handleInputChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSalvarEndereco}>Salvar</Button>
      </Box>
    </Box>
  );
};

export default MeusEnderecos;