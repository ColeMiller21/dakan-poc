import "./globals.css";
import type { Metadata } from "next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers/providers";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-dino antialiased")}>
        <Providers>
          <div className=" flex min-h-screen flex-col items-center ">
            <div className="flex min-h-screen flex-col items-center w-full max-w-[1400px]">
              <SiteHeader />
              <div className="flex-1 w-full px-4 lg:px-0">{children}</div>
              <TailwindIndicator />
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
