import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestão Tech RH — uma solução DamaTech",
  description:
    "O sistema operacional do RH: centralize admissões, documentos, colaboradores, solicitações, férias, treinamentos, desligamentos e evidências de conformidade em uma única plataforma.",
  applicationName: "Gestão Tech RH",
  authors: [{ name: "DamaTech" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
