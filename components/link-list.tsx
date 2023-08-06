import React from "react";
import Link from "next/link";
import { siteConfig, LinksType } from "@/config/site";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

export function LinkList() {
  return (
    <>
      {Object.keys(siteConfig.links).map((type: string, i: number) => (
        <Link
          href={siteConfig.links[type as keyof LinksType]}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={`${buttonVariants({
              size: "sm",
              variant: "ghost",
            })}`}
          >
            <RenderedIcon type={type} />
            <span className="sr-only">{type}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

interface IconProps {
  type: string;
}

const RenderedIcon: React.FC<IconProps> = ({ type }) => {
  const iconSize = "h-6 w-6";

  const renderIcon = () => {
    switch (type) {
      case "twitter":
        return <Icons.twitter className={`${iconSize}`} />;
      case "discord":
        return <Icons.discord className={`${iconSize}`} />;
      case "instagram":
        return <Icons.instagram className={`${iconSize}`} />;
      case "youtube":
        return <Icons.youtube className={`${iconSize}`} />;
      case "linktree":
        return <Icons.linktree className={`${iconSize}`} />;
      default:
        return <span></span>; // Default icon
    }
  };

  return <div>{renderIcon()}</div>;
};
