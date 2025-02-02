import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { IUserSignup } from "../../commons/interfaces";
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
} from "@chakra-ui/react";
import { NavigationBar } from "@/components/NavLoginSigIn";
import Notification from "@/components/Notification";

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
    email: "", 
  });
  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    password: "",
    email: "",  
  });
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [notification, setNotification] = useState<{ message: string; status: "success" | "error" } | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickSignup = async () => {
    setPendingApiCall(true);

    const user: IUserSignup = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
      email: form.email,  
    };

    const response = await AuthService.signup(user);
    if (response.status === 200 || response.status === 201) {
      setNotification({ message: "Cadastro realizado com sucesso!", status: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setNotification({ message: "Erro ao cadastrar o usuário!", status: "error" });
      if (response.data.validationErrors) {
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
          <FormControl id="displayName" isInvalid={!!errors.displayName} mb={4}>
            <FormLabel>Informe seu nome:</FormLabel>
            <ChakraInput
              name="displayName"
              type="text"
              value={form.displayName}
              placeholder="Informe seu nome"
              onChange={onChange}
            />
            {errors.displayName && (
              <Text color="red.500" mt={2}>{errors.displayName}</Text>
            )}
          </FormControl>
          <FormControl id="username" isInvalid={!!errors.username} mb={4}>
            <FormLabel>Informe seu usuário:</FormLabel>
            <ChakraInput
              name="username"
              type="text"
              value={form.username}
              placeholder="Informe seu usuário"
              onChange={onChange}
            />
            {errors.username && (
              <Text color="red.500" mt={2}>{errors.username}</Text>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password} mb={4}>
            <FormLabel>Informe a sua senha:</FormLabel>
            <ChakraInput
              name="password"
              type="password"
              value={form.password}
              placeholder="Informe a sua senha"
              onChange={onChange}
            />
            {errors.password && (
              <Text color="red.500" mt={2}>{errors.password}</Text>
            )}
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email} mb={4}>
            <FormLabel>Informe seu email:</FormLabel>
            <ChakraInput
              name="email"
              type="email"
              value={form.email}
              placeholder="Informe seu email"
              onChange={onChange}
            />
            {errors.email && (
              <Text color="red.500" mt={2}>{errors.email}</Text>
            )}
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
            Já possui uma conta? <Link to="/login" style={{ color: "#3182ce" }}>Login</Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
