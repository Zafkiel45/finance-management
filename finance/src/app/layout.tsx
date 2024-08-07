import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão de Finanças",
  description: "Controle agora seus gatos mensais e tenha visão melhor de suas despesas ao longo do mês.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} transition-all overflow-x-hidden dark:text-[#eeeeee] w-screen min-h-screen dark:bg-[#111111]`}>
        {children}
      </body>
    </html>
  );
}
