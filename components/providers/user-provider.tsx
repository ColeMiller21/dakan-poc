"use client";
import { useAddress, useUser } from "@thirdweb-dev/react";
// UserProvider.js
import { useState, useEffect, ReactNode } from "react";
import UserContext from "@/context/user-context";
import { User } from "@/types/user";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const address = useAddress();
  const { user: twUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [twUser]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.status === 200) {
        const data = await response.json();
        if (!data.user) {
          setUser(null);
          setIsLoggedIn(false);
          return;
        }
        setIsLoggedIn(true);
        setUser(data.user.data.user);
      } else if (response.status === 401) {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
