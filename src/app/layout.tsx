import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const main_font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intelbras Access Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={main_font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen max-w-5xl mx-auto flex-col p-8">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
