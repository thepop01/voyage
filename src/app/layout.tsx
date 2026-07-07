import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/components/auth/AuthProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ["latin"], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Voyage",
  description: "Campaign credentialing, digital reputation, and research platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", spaceGrotesk.variable, inter.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!Object.getOwnPropertyDescriptor(window, 'ethereum')) {
                Object.defineProperty(window, 'ethereum', {
                  value: undefined,
                  configurable: true,
                  writable: true,
                });
              }
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.className)}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
