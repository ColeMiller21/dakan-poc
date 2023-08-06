import { Icons } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dakan POC",
  description: "Proof of concept for Dakan Marketplace",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    { title: "Pass", href: "/pass" },
    { title: "Claim", href: "/claim" },
  ],
  links: {
    discord: "https://discord.com/invite/37Gc3pqx3r",
    twitter: "https://twitter.com/dakan_io",
    instagram: "https://www.instagram.com/dakan.io/",
    youtube: "https://www.youtube.com/@dakan_official",
    linktree: "https://linktr.ee/dakan_official",
  },
};

export type LinksType = typeof siteConfig.links;
