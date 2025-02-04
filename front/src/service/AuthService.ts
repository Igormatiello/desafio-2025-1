import { ICriarPessoaDTO, IUserLogin } from "@/commons/interfaces";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { api } from "@/lib/axios";

const fpPromise = FingerprintJS.load();

const getFingerprint = async () => {
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId;
};

const setLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

const getLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

const login = async (user: IUserLogin): Promise<any> => {
  let response;
  const fingerprint = await getFingerprint();

  try {
    response = await api.post("/login", user, {
      headers: { Fingerprint: fingerprint },
    });

    if (response.status === 200) {
      setLocalStorage("token", response.data.token);
      setLocalStorage("fingerprint", fingerprint);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      api.defaults.headers.common["Fingerprint"] = fingerprint;

      const tipoResponse = await api.get("/users/tipo");
      if (tipoResponse.status === 200) {
        setLocalStorage("tipo", tipoResponse.data);
      }
    }
  } catch (error: any) {
    response = error.response;
  }

  return response;
};

const isAuthenticated = async (): Promise<boolean> => {
  const token = getLocalStorage("token");
  const storedFingerprint = getLocalStorage("fingerprint");
  const currentFingerprint = await getFingerprint();

  if (token && storedFingerprint && storedFingerprint === currentFingerprint) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Fingerprint"] = currentFingerprint;
    try {
      const response = await api.get("/users/validateToken");
      if (response.status === 200) {
        return true;
      } else {
        removeLocalStorage("token");
        removeLocalStorage("fingerprint");
        return false;
      }
    } catch (error) {
      removeLocalStorage("token");
      removeLocalStorage("fingerprint");
      return false;
    }
  } else {
    removeLocalStorage("token");
    removeLocalStorage("fingerprint");
    return false;
  }
};

const signup = async (user: ICriarPessoaDTO): Promise<any> => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const editUserAndPessoa = async (user: ICriarPessoaDTO): Promise<any> => {
  let response;
  try {
    response = await api.put("/users/editar", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const getUserProfile = async (): Promise<ICriarPessoaDTO | null> => {
  let response;
  try {
    response = await api.get("/users/dados");
    // Verifica se a resposta contém os dados no formato correto
    if (response && response.data && response.data.data) {
      return response.data.data; // Retorna os dados do usuário
    }
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return null; // Retorna null em caso de erro
  }
  return null; // Retorna null se a resposta estiver mal formatada
};

const logout = (): void => {
  removeLocalStorage("token");
  removeLocalStorage("fingerprint");
  api.defaults.headers.common["Authorization"] = "";
  api.defaults.headers.common["Fingerprint"] = "";
};

const AuthService = {
  signup,
  login,
  isAuthenticated,
  logout,
  editUserAndPessoa,
  getUserProfile,
};

export default AuthService;
