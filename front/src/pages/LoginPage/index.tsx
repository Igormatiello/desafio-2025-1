import { ChangeEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heading, Flex, Box, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { NavigationBar } from '@/components/NavLoginSigIn';
import AuthService from '@/service/AuthService';
import { IUserLogin } from '@/commons/interfaces';
import Notification from '@/components/Notification';

export function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: ''
    });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [notification, setNotification] = useState<{ message: string; status: "success" | "error" } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const onClickLogin = async () => {
    const login: IUserLogin = {
      username: form.username,
      password: form.password
    };

    setPendingApiCall(true);

    const response = await AuthService.login(login);
    if (response.status === 200) {
      setApiSuccess('Login realizado com sucesso!');
      setNotification({ message: 'Login realizado com sucesso!', status: 'success' });
      setTimeout(() => {
        navigate(from); // Redireciona para a rota de origem
      }, 1000);
    } else {
      setApiError('Erro ao autenticar o usuário!');
      setNotification({ message: 'Erro ao autenticar o usuário!', status: 'error' });
    }

    setPendingApiCall(false);
  };

  return (
    <Flex direction="column" minH="100vh" bg="white">
      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
          onClose={() => setNotification(null)}
        />
      )}
      <NavigationBar />
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={8}>
        <Heading as="h1" textAlign="center" mb={6}>
          Login
        </Heading>
        <Box width="100%" maxWidth="400px">
          <FormControl id="username" mb={4}>
            <FormLabel>Informe seu usuário:</FormLabel>
            <Input
              name="username"
              type="text"
              value={form.username}
              placeholder="Informe seu usuário"
              onChange={onChange}
            />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Informe sua senha:</FormLabel>
            <Input
              name="password"
              type="password"
              value={form.password}
              placeholder="******"
              onChange={onChange}
            />
          </FormControl>
          {apiError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {apiError}
            </Alert>
          )}
          {apiSuccess && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {apiSuccess}
            </Alert>
          )}
          <Button
            colorScheme="blue"
            isLoading={pendingApiCall}
            loadingText="Entrando"
            onClick={onClickLogin}
            mb={4}
            width="100%"
          >
            Entrar
          </Button>
          <Text textAlign="center">
            Ainda não possui uma conta?{' '}
            <Link to="/signup" style={{ color: '#3182ce' }}>
              Cadastre-se
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
