"use client";
import { useContext } from "react";
import UserContext from "@/context/user-context";

export function UserProfile() {
  const { user, loading, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) return <div>No logged in user!</div>;

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <p>Profile for: {user?.address}</p>
      <p>Amount of Claims: {user?.claim_count ? user?.claim_count : 0}</p>
      <p>{JSON.stringify(user?.claims)}</p>
      {user?.claims ? (
        <div>
          <div className="mx-auto max-w-screen-xl px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center">
            {user.claims.map((c: any) => {
              return (
                <video width="320" height="240" controls loop autoPlay muted>
                  <source src={c.image_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No Claims</div>
      )}
    </div>
  );
}

function ProfileHeader() {
  return <div className="flex h-[150px] w-screen bg-gray-500">Profile</div>;
}
