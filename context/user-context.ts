import { createContext } from "react";
import { User } from "@/types/user";

interface UserContextProps {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
  isLoggedIn: false,
});

export default UserContext;
