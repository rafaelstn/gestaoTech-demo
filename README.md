# Gestão Tech RH

**Uma solução DamaTech para gestão, automação e conformidade de Recursos Humanos.**

Demonstração comercial navegável de um SaaS de RH: centraliza admissões, documentos, colaboradores, solicitações, férias, treinamentos, desligamentos e evidências de conformidade em uma única plataforma. Feita para apresentar em reuniões comerciais, tráfego pago e landing page.

> Demo com dados fictícios (Grupo Alfa Serviços). Sem backend real: tudo roda no navegador com dados mockados locais, mas com cara de produto em operação.

---

## Stack

- **Next.js 15** (App Router, `output: 'export'` — site estático, sem servidor)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (tokens em `@theme`)
- **Recharts** (gráficos executivos)
- **lucide-react** (ícones)
- **jsPDF** (exportação de relatórios em PDF, carregada sob demanda)

## Como rodar localmente

Pré-requisito: Node.js 18.18+ (recomendado 20/22/24).

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento em http://localhost:3000
```

Outros scripts:

```bash
npm run build     # build de produção estático (gera /out)
npm run typecheck # checagem de tipos (tsc --noEmit)
npm run lint      # lint
```

O build gera a pasta `out/` com o site estático, pronto para publicar em qualquer host de arquivos.

## Deploy (Vercel)

O projeto é estático (`output: 'export'`). Na Vercel, o framework é detectado automaticamente e a saída publicada. Também é possível servir a pasta `out/` em qualquer CDN ou hospedagem estática.

---

## Rotas

### Site comercial
| Rota | Descrição |
|------|-----------|
| `/` | Landing page comercial (hero, dores, solução, módulos, automações, CTA) |
| `/demo` | Central de demonstração com acesso a todos os módulos |

### Sistema (com sidebar + topbar)
| Rota | Módulo |
|------|--------|
| `/dashboard` | Visão geral do RH (KPIs, gráficos, alertas) |
| `/recrutamento` | Recrutamento e seleção (vagas, funil, candidatos) |
| `/admissao` | Admissão digital (pipeline + checklist) |
| `/colaboradores` | Lista de colaboradores (CRUD) |
| `/colaboradores/[id]` | Dossiê funcional do colaborador (11 abas) |
| `/solicitacoes` | Central de atendimento do RH (chamados + FAQ) |
| `/documentos` | Gestão documental (validade, status, assinatura) |
| `/ferias-afastamentos` | Férias, licenças e afastamentos |
| `/treinamentos` | Treinamentos internos e obrigatórios |
| `/desempenho` | Ciclos de avaliação e PDI |
| `/beneficios` | Benefícios, elegibilidade e solicitações |
| `/desligamentos` | Offboarding (pipeline + checklist) |
| `/nr1-conformidade` | Apoio à conformidade NR-1 (obrigações + ações corretivas) |
| `/relatorios` | Relatórios executivos (exportação PDF/Excel real) |
| `/configuracoes` | Empresa, usuários, permissões, automações, segurança, logs |

---

## Estrutura do projeto

```
app/
  (site)/           # landing e central de demo (sem shell)
    page.tsx        # landing comercial
    demo/           # /demo
  (app)/            # módulos do sistema (com AppShell)
    layout.tsx      # sidebar + topbar
    dashboard/ ...  # um diretório por módulo
components/
  brand/            # logo do produto
  charts/           # wrappers de gráfico (Recharts)
  data/             # CrudList genérico (add/editar/excluir)
  modules/          # views client específicas (dossiê)
  shell/            # AppShell, Sidebar, Topbar
  site/             # navbar, footer e hero da landing
  ui/               # biblioteca de componentes (Card, Badge, Modal, KPI...)
lib/
  mock/             # dados fictícios tipados por domínio
  theme/tokens.ts   # tokens de cor espelhados para os gráficos
  types.ts          # tipos de domínio do RH
  format.ts         # formatadores PT-BR (BRL, data, percentual)
  nav.ts            # configuração de navegação (14 módulos)
  export.ts         # exportação real de PDF/CSV
```

---

## Observações sobre o módulo NR-1

O módulo de NR-1 é uma ferramenta de **apoio à organização da conformidade**. Ele não substitui consultoria jurídica, trabalhista ou de segurança do trabalho. A validação final deve ser feita por profissionais especializados. Esta versão não implementa folha de pagamento, cálculo trabalhista, integração oficial com eSocial ou validação jurídica automática.

---

_© 2026 DamaTech. Demonstração com dados fictícios._
