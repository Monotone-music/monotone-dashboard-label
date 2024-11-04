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
  setUser: (userData: { user: User; token: string }) => void;
  logout: () => void;
}
