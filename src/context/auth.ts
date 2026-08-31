import type {User} from '../types/user';

export interface AuthContextType {
  token: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (token: string, userData: User) => void;
  logout: () => void;
}
