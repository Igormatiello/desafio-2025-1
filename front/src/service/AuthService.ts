import { IUserLogin, IUserSignup } from "@/commons/interfaces";

import FingerprintJS from '@fingerprintjs/fingerprintjs';
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
      headers: { 'Fingerprint': fingerprint }
    });

    if (response.status === 200) {
      setLocalStorage("token", response.data.token); // Armazenar o token no localStorage
      setLocalStorage("fingerprint", fingerprint); // Armazenar o fingerprint no localStorage
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      api.defaults.headers.common["Fingerprint"] = fingerprint;
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
      const response = await api.get('/users/validateToken');
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
    // Se o fingerprint não corresponder ou estiver ausente, limpar os dados
    removeLocalStorage("token");
    removeLocalStorage("fingerprint");
    return false;
  }
};

const signup = async (user: IUserSignup): Promise<any> => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
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
};

export default AuthService;
