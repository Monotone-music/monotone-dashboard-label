// Define the User type with necessary properties
interface User {
  id: string;
  name: string;
  role: string; // Example roles: "artist", "admin", etc.
}

// Define the AuthState type
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  errorMsg: string| null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setErrorMsg: (errorMsg: string) => void;
  logout: () => void;
}
