/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: sobe na Vercel ou em qualquer host de arquivos, sem servidor Node.
  output: "export",
  // Sem otimização de imagem em runtime (não há servidor no export).
  images: { unoptimized: true },
  // URLs com barra final: compatível com hospedagem estática por diretório.
  trailingSlash: true,
};

export default nextConfig;
