import { ClaimGrid } from "@/components/claim/claim-grid";
export default async function Page() {
  return (
    <div className="w-screen flex flex-col overflow-hidden justify-center items-center mt-12">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Claims
      </h1>
      <div className="w-full flex justify-center items-center">
        <ClaimGrid />
      </div>
    </div>
  );
}
