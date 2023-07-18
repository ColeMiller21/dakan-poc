import { UserProfile } from "@/components/profile/user-profile";

export default function Profile() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Profile
        </h1>
        <UserProfile />
      </div>
    </section>
  );
}
