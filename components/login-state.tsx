"use client";
import { useContext } from "react";
import { Button } from "./ui/button";
import UserContext from "@/context/user-context";

export function LoginState() {
  const { user, loading, isLoggedIn } = useContext(UserContext);
  const logUserInfo = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data); // eslint-disable-line
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <p>User logged In: {`${isLoggedIn}`}</p>
        {isLoggedIn && (
          <>
            <p>Logged in user: {user?.address}</p>
            <p>Session context: {JSON.stringify(user, null, 2)}</p>
            <Button onClick={logUserInfo}>Log User</Button>
          </>
        )}
      </div>
    </div>
  );
}
