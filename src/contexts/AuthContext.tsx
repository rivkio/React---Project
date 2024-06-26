import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { RegisterUser } from "../@types/types";
import * as auth from "../services/auth";

interface AuthContextType {
  token: string | null;
  user: User | undefined;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>
  register: (form: RegisterUser) => Promise<void>
  logout: () => void;
}

export type User = {
  _id: string
  isBusiness: boolean
  email: string
  name: {
    first: string
    middle: string
    last: string
  },
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
}
export const AuthContext = createContext<AuthContextType >(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState<boolean>(true)


  const isLoggedIn = useMemo(() => user !== undefined, [user])

  useEffect(() => {
    setLoading(true)
    if (token) {
      const { _id } = jwtDecode(token) as any
      auth.userDetails(_id).then((res) => {
        setUser(res.data)
      }).finally(() => setLoading(false))
    }
    else {
      setLoading(false)
    }
  }, [token])


 const login = async (email: string, password: string) => {
    await auth
      .login({ email, password })
      .then((res) => {
        setToken(res.data);
        localStorage.setItem("token", res.data);
      })

  } 


  const register = async (form: RegisterUser) => {
    await auth
      .register(form)
  }

  const logout = () => {
    setToken(null);
    setUser(undefined)
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
