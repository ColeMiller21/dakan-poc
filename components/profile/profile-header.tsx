import Image from "next/image";
import { User } from "@/types/user";
import { Icons } from "@/components/icons";

export function ProfileHeader({ data }: { data: User }) {
  console.log(data);
  return (
    <div
      className={`
        w-full h-[225px] 
        border-b-2 border-[#66ff91]
        flex items-center justify-between
        px-8
        `}
    >
      <div
        className={`
          h-full
          flex flex-col justify-center
        
        `}
      >
        <Image
          src="/images/dakan.png"
          alt="dakan user"
          width={150}
          height={150}
          className={`
            rounded-full
            `}
        />
      </div>
      <div className="flex items-center">
        <span>
          <Icons.copy className="h-5 w-5 fill-current" />
        </span>
        {data.address}
      </div>
    </div>
  );
}
