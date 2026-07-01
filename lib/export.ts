/**
 * Exportação real client-side para a demo (nenhum botão morto).
 * CSV via Blob nativo; PDF via jsPDF com import dinâmico no clique.
 */

export function baixarCSV(nomeArquivo: string, headers: string[], linhas: (string | number)[][]) {
  const escapar = (v: string | number) => {
    const s = String(v);
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const conteudo = [headers, ...linhas].map((l) => l.map(escapar).join(";")).join("\n");
  // BOM para Excel abrir com acentuação correta
  const blob = new Blob(["﻿" + conteudo], { type: "text/csv;charset=utf-8;" });
  disparar(blob, `${nomeArquivo}.csv`);
}

export async function baixarPDF(
  titulo: string,
  subtitulo: string,
  headers: string[],
  linhas: (string | number)[][],
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: linhas[0]?.length > 4 ? "landscape" : "portrait" });
  const margemX = 14;
  let y = 20;

  // Cabeçalho
  doc.setFontSize(16);
  doc.setTextColor("#0f2743");
  doc.text("Gestão Tech RH", margemX, y);
  doc.setFontSize(9);
  doc.setTextColor("#64748b");
  doc.text("uma solução DamaTech · Grupo Alfa Serviços", margemX, y + 5);

  y += 16;
  doc.setFontSize(13);
  doc.setTextColor("#14335d");
  doc.text(titulo, margemX, y);
  doc.setFontSize(9);
  doc.setTextColor("#64748b");
  doc.text(subtitulo, margemX, y + 5);

  // Tabela
  y += 14;
  const larguraPagina = doc.internal.pageSize.getWidth();
  const colW = (larguraPagina - margemX * 2) / headers.length;

  doc.setFillColor("#14335d");
  doc.rect(margemX, y - 5, larguraPagina - margemX * 2, 8, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(9);
  headers.forEach((h, i) => doc.text(String(h), margemX + 2 + i * colW, y));

  y += 8;
  doc.setTextColor("#334155");
  linhas.forEach((linha, idx) => {
    if (y > doc.internal.pageSize.getHeight() - 15) {
      doc.addPage();
      y = 20;
    }
    if (idx % 2 === 0) {
      doc.setFillColor("#f1f5f9");
      doc.rect(margemX, y - 5, larguraPagina - margemX * 2, 7, "F");
    }
    linha.forEach((cel, i) => {
      const texto = String(cel);
      const cortado = texto.length > 22 ? texto.slice(0, 21) + "…" : texto;
      doc.text(cortado, margemX + 2 + i * colW, y);
    });
    y += 7;
  });

  // Rodapé
  doc.setFontSize(8);
  doc.setTextColor("#94a3b8");
  doc.text("Documento gerado pela demonstração do Gestão Tech RH. Dados fictícios.", margemX, doc.internal.pageSize.getHeight() - 8);

  doc.save(`${titulo.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

function disparar(blob: Blob, nome: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
