import { Skeleton } from "../ui/skeleton";

const loaderAmount = [1, 2, 3, 4, 5];

export function GridLoader() {
  return (
    <>
      {loaderAmount.map((l: number) => {
        return (
          <div
            className="flex flex-col items-center space-y-4 p-4 w-[320px]"
            key={`${l}-loader`}
          >
            <Skeleton className="h-[240px] w-[320px]" />
            <Skeleton className="h-[20px] w-[75px]" />
            <Skeleton className="h-[40px] w-[75px]" />
          </div>
        );
      })}
    </>
  );
}
