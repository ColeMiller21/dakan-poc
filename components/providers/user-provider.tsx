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
  console.log(twUser);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log({ address, twUser, user });
    fetchUser();
  }, [twUser]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user");

      if (response.status === 200) {
        const data = await response.json();
        console.log({ data });
        if (!data.user) {
          console.log("is not logged in");
          setUser(null);
          setIsLoggedIn(false);
          return;
        }
        console.log("is logged in");
        setIsLoggedIn(true);
        setUser(data.user);
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
