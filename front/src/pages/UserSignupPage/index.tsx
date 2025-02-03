import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { ICriarPessoaDTO } from "../../commons/interfaces";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Alert,
  AlertIcon,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { NavigationBar } from "@/components/NavLoginSigIn";
import Notification from "@/components/Notification";

export function UserSignupPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    tipo: "", // E para estudante e P para professor
  });
  
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    tipo: "",
  });
  
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [notification, setNotification] = useState<{ message: string; status: "success" | "error" } | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Validação dos campos conforme as restrições:
   * - username: mínimo 4 e máximo 255 caracteres
   * - password: mínimo 6 e máximo 255 caracteres
   * - nome: mínimo 3 e máximo 255 caracteres
   * - email: formato de email válido
   * - telefone: entre 10 e 15 caracteres
   * - cpf: exatamente 11 dígitos (somente números)
   * - tipo: deve ser "E" (estudante) ou "P" (professor)
   */
  const validateForm = (): boolean => {
    const newErrors = {
      username: "",
      password: "",
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      tipo: "",
    };

    // Validação do username
    if (!form.username.trim()) {
      newErrors.username = "Username é obrigatório.";
    } else if (form.username.trim().length < 4) {
      newErrors.username = "Username deve ter no mínimo 4 caracteres.";
    } else if (form.username.trim().length > 255) {
      newErrors.username = "Username deve ter no máximo 255 caracteres.";
    }

    // Validação da senha
    if (!form.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (form.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres.";
    } else if (form.password.length > 255) {
      newErrors.password = "Senha deve ter no máximo 255 caracteres.";
    }

    // Validação do nome
    if (!form.nome.trim()) {
      newErrors.nome = "Nome é obrigatório.";
    } else if (form.nome.trim().length < 3) {
      newErrors.nome = "Nome deve ter no mínimo 3 caracteres.";
    } else if (form.nome.trim().length > 255) {
      newErrors.nome = "Nome deve ter no máximo 255 caracteres.";
    }

    // Validação do email
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório.";
    } else {
      // Expressão regular simples para validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = "Email inválido.";
      }
    }

    // Validação do telefone
    if (!form.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório.";
    } else if (form.telefone.trim().length < 10) {
      newErrors.telefone = "Telefone deve ter no mínimo 10 caracteres.";
    } else if (form.telefone.trim().length > 15) {
      newErrors.telefone = "Telefone deve ter no máximo 15 caracteres.";
    }

    // Validação do CPF
      // Validação do CPF: remove todos os caracteres que não são dígitos
      const cpfDigits = form.cpf.replace(/\D/g, "");
      if (!cpfDigits) {
        newErrors.cpf = "CPF é obrigatório.";
      } else if (cpfDigits.length !== 11) {
        newErrors.cpf = "CPF deve ter exatamente 11 dígitos.";
      }

    // Validação do tipo
    if (!form.tipo) {
      newErrors.tipo = "Selecione o tipo de usuário.";
    } else if (form.tipo !== "E" && form.tipo !== "P") {
      newErrors.tipo = "Tipo de usuário inválido.";
    }

    setErrors(newErrors);
    // Se nenhum erro estiver presente, retorna true
    return Object.values(newErrors).every(error => error === "");
  };

  const onClickSignup = async () => {
    // Executa as validações antes de enviar a requisição
    if (!validateForm()) {
      return;
    }

    setPendingApiCall(true);

    // Monta o objeto de payload conforme o DTO CreatePessoaDTO
    const createPessoaDTO: ICriarPessoaDTO = {
      username: form.username,
      password: form.password,
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
      ativo: true, // fixado como true no cadastro
      tipo: form.tipo,
    };

    // Chama o serviço de cadastro (endpoint: POST /users)
    const response = await AuthService.signup(createPessoaDTO);
    
    if (response.status === 200 || response.status === 201) {
      setNotification({ message: "Cadastro realizado com sucesso!", status: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setNotification({ message: "Erro ao cadastrar o usuário!", status: "error" });
      if (response.data && response.data.validationErrors) {
        setErrors(response.data.validationErrors);
      }
    }
    setPendingApiCall(false);
  };

  return (
    <Flex direction="column" minH="100vh" bg="white">
      <NavigationBar />
      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
          onClose={() => setNotification(null)}
        />
      )}
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={8}>
        <Heading as="h1" textAlign="center" mb={6}>
          Cadastrar-se
        </Heading>
        <Box width="100%" maxWidth="400px">
          <FormControl id="nome" isInvalid={!!errors.nome} mb={4}>
            <FormLabel>Nome completo:</FormLabel>
            <ChakraInput
              name="nome"
              type="text"
              value={form.nome}
              placeholder="Informe seu nome completo"
              onChange={onChange}
            />
            {errors.nome && <Text color="red.500" mt={2}>{errors.nome}</Text>}
          </FormControl>
          <FormControl id="username" isInvalid={!!errors.username} mb={4}>
            <FormLabel>Usuário:</FormLabel>
            <ChakraInput
              name="username"
              type="text"
              value={form.username}
              placeholder="Informe seu usuário"
              onChange={onChange}
            />
            {errors.username && <Text color="red.500" mt={2}>{errors.username}</Text>}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password} mb={4}>
            <FormLabel>Senha:</FormLabel>
            <ChakraInput
              name="password"
              type="password"
              value={form.password}
              placeholder="Informe sua senha"
              onChange={onChange}
            />
            {errors.password && <Text color="red.500" mt={2}>{errors.password}</Text>}
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email} mb={4}>
            <FormLabel>Email:</FormLabel>
            <ChakraInput
              name="email"
              type="email"
              value={form.email}
              placeholder="Informe seu email"
              onChange={onChange}
            />
            {errors.email && <Text color="red.500" mt={2}>{errors.email}</Text>}
          </FormControl>
          <FormControl id="telefone" isInvalid={!!errors.telefone} mb={4}>
            <FormLabel>Telefone:</FormLabel>
            <ChakraInput
              name="telefone"
              type="text"
              value={form.telefone}
              placeholder="Informe seu telefone"
              onChange={onChange}
            />
            {errors.telefone && <Text color="red.500" mt={2}>{errors.telefone}</Text>}
          </FormControl>
          <FormControl id="cpf" isInvalid={!!errors.cpf} mb={4}>
            <FormLabel>CPF:</FormLabel>
            <ChakraInput
              name="cpf"
              type="text"
              value={form.cpf}
              placeholder="Informe seu CPF (11 dígitos)"
              onChange={onChange}
            />
            {errors.cpf && <Text color="red.500" mt={2}>{errors.cpf}</Text>}
          </FormControl>
          <FormControl id="tipo" isInvalid={!!errors.tipo} mb={4}>
            <FormLabel>Tipo de usuário:</FormLabel>
            <Select
              name="tipo"
              placeholder="Selecione o tipo de usuário"
              value={form.tipo}
              onChange={onChange}
            >
              <option value="E">Estudante</option>
              <option value="P">Professor</option>
            </Select>
            {errors.tipo && <Text color="red.500" mt={2}>{errors.tipo}</Text>}
          </FormControl>
          {notification && notification.status === "error" && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {notification.message}
            </Alert>
          )}
          {notification && notification.status === "success" && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {notification.message}
            </Alert>
          )}
          <Button
            colorScheme="blue"
            isLoading={pendingApiCall}
            loadingText="Cadastrando"
            onClick={onClickSignup}
            width="100%"
            mb={4}
          >
            Cadastrar
          </Button>
          <Text textAlign="center">
            Já possui uma conta?{" "}
            <Link to="/login" style={{ color: "#3182ce" }}>
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
