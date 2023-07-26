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
    twitter: "https://twitter.com/dakan_io",
  },
};
