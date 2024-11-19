// Define the User type with necessary properties
interface User {
  id: string;
  name: string;
  role: string; // Example roles: "artist", "admin", etc.
}

// Define the AuthState type
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setError: (error: string | null) => void;
}
