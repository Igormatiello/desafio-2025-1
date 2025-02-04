import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Spinner, Alert, AlertIcon, useToast, HStack, Input, FormControl, FormLabel, Select } from "@chakra-ui/react";
import service from "@/service/AuthService"; // Ajuste o caminho conforme necessário
import { ICriarPessoaDTO } from "@/commons/interfaces"; // Ajuste o caminho conforme necessário

const MeusDadosUsuario = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<ICriarPessoaDTO | null>(null);
  const [editedUserData, setEditedUserData] = useState<ICriarPessoaDTO | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await service.getUserProfile();
        // Verifica se a resposta tem dados válidos
        if (profile) {
          setUserData(profile); // Armazena os dados corretamente
          setEditedUserData(profile); // Inicializa os dados para edição
        } else {
          setError("Dados do usuário não encontrados.");
        }
      } catch (error) {
        setError("Erro ao carregar dados do usuário.");
        toast({
          title: "Erro ao carregar dados",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditUser = async () => {
    if (!editedUserData) return;

    try {
      const response = await service.editUserAndPessoa(editedUserData);
      if (response.status === 200) {
        toast({
          title: "Dados atualizados com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setUserData(editedUserData); // Atualiza os dados exibidos após a edição
      }
    } catch (error) {
      setError("Erro ao atualizar dados.");
      toast({
        title: "Erro ao atualizar",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading mb={5} textAlign="center">Meus Dados de Usuário</Heading>

      {loading && <Spinner size="xl" display="block" mx="auto" />}
      
      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
      
      {editedUserData && (
        <Box mt={5} p={4} borderWidth={1} borderRadius="md" shadow="md">
          <Heading size="md" mb={3}>Informações do Usuário</Heading>

          <FormControl mb={3}>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input
              id="nome"
              name="nome"
              value={editedUserData.nome}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor="telefone">Telefone</FormLabel>
            <Input
              id="telefone"
              name="telefone"
              value={editedUserData.telefone}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              name="cpf"
              value={editedUserData.cpf}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor="tipo">Tipo</FormLabel>
            <Select
              id="tipo"
              name="tipo"
              value={editedUserData.tipo}
              onChange={handleInputChange}
            >
              <option value="P">Professor</option>
              <option value="E">Estudante</option>
            </Select>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel htmlFor="ativo">Status</FormLabel>
            <Select
              id="ativo"
              name="ativo"
              value={editedUserData.ativo ? "Ativo" : "Inativo"}
              onChange={handleInputChange}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </Select>
          </FormControl>

          <HStack mt={4} justify="space-between">
            <Button colorScheme="blue" onClick={handleEditUser}>Salvar Alterações</Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default MeusDadosUsuario;
