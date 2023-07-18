"use client";
import { useContext } from "react";
import UserContext from "@/context/user-context";

export function UserProfile() {
  const { user, loading, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) return <div>No logged in user!</div>;

  return (
    <div className="w-full flex justify-center">
      <p>Profile for: {user?.address}</p>
    </div>
  );
}
