import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // restore session
  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);

  }, []);

  // login
  const login = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      userData.token
    );

    setUser(userData);
  };

  // logout
  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}