# Comparativo: ML Control Plane vs. Requisitos da Vaga — Frontend Engineer (MLOps/IA)

> **Projeto:** ML Control Plane — Plataforma Enterprise de MLOps e Observabilidade de IA
> **Data:** Maio 2026
> **Stack:** Next.js 15.2 + React 19 + TypeScript 5.7 + Tailwind CSS 3.4

---

## 1. Tabela Resumo

| # | Requisito | Status | Detalhes |
|---|-----------|--------|----------|
| 1 | React | ✅ | React 19 com Next.js 15 App Router |
| 2 | TypeScript | ✅ | v5.7 strict, `noUncheckedIndexedAccess`, tipos complexos |
| 3 | APIs REST | ✅ | HTTP client genérico tipado + TanStack React Query + query key factory |
| 4 | D3.js | ❌ | Não presente no projeto |
| 5 | Recharts | ✅ | v3.8.1 implementado: `MetricsTimeSeries`, `ProviderLatencyChart`, `SystemMetricsPanel` |
| 6 | Chart.js | ❌ | Não presente |
| 7 | ECharts | ❌ | Não presente |
| 8 | Jest | ⚠️ | Substituído por **Vitest** (equivalente moderno, compatível com Jest API) |
| 9 | Cypress | ✅ | Configurado com testes E2E para Dashboard, System Health |
| 10 | Testing Library | ✅ | `@testing-library/react` + `@testing-library/jest-dom` + `@testing-library/user-event` |
| 11 | Datadog RUM | ❌ | Não integrado |
| 12 | Sentry | ❌ | Não integrado |
| 13 | Web Vitals | ✅ | Integrado via `useReportWebVitals` do Next.js, com logger + endpoint configurável |
| 14 | LLM | ✅ | Domain model completo: OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Cohere, HuggingFace, AWS, Azure, Custom |
| 15 | MLOps | ✅ | Core do projeto: model registry, experiment tracking, deployments, pipelines, datasets, monitoring |
| 16 | Design Systems | ✅ | Custom UI components (Button, Badge, Skeleton, DataTable) + Tailwind theme system |
| 17 | Micro-frontends | ❌ | Monólito Next.js padrão, sem Module Federation ou Single SPA |
| 18 | Developer Portals | ⚠️ | O projeto **é** um portal administrativo, mas não um dev portal no sentido clássico (backstage, etc.) |
| 19 | MLOps UIs | ✅ | Propósito central: dashboards de modelos, experimentos, deployments, pipelines |
| 20 | Admin Panels | ✅ | Enterprise Shell com sidebar, topbar, command palette, breadcrumbs |
| 21 | Data Platforms | ⚠️ | Feature de datasets com schema, estatísticas e formatos, mas sem plataforma de dados completa |

**Legenda:** ✅ Atende / ⚠️ Parcial / ❌ Não atende

---

## 2. Análise Detalhada por Categoria

### 2.1 Stack Principal (React, TypeScript, APIs REST)

| Aspecto | O que a vaga pede | O que o projeto entrega |
|---------|------------------|------------------------|
| Framework | React ou Angular em plataformas de médio/grande porte | **React 19 + Next.js 15** (App Router), arquitetura moderna Server Components |
| TypeScript | Domínio avançado, estado complexo, componentização em escala | **TypeScript 5.7 strict**, `noUncheckedIndexedAccess`, path aliases, tipos de domínio ricos (`ModelMetadata`, `ExperimentRun`, `Deployment`, `Pipeline`, `Dataset`) |
| APIs REST | Integração a APIs REST complexas, camadas de abstração no frontend | **TanStack React Query v5** (cache, staleTime, retry), **HTTP client genérico** com Bearer token, **query key factory** por domínio, **Zod** para validação de params |

**Veredito:** ✅ **Atende plenamente.** A stack é moderna, bem estruturada e segue boas práticas.

---

### 2.2 Visualização de Dados (D3.js, Recharts, Chart.js, ECharts)

| Biblioteca | No projeto | Observação |
|-----------|-----------|------------|
| D3.js | ❌ | Ausente |
| Recharts | ✅ | Componentes implementados: `MetricsTimeSeries` (linha multi-série), `ProviderLatencyChart` (barras horizontais), `SystemMetricsPanel` (painel completo) |
| Chart.js | ❌ | Ausente |
| ECharts | ❌ | Ausente |

**Componentes Recharts criados:**
- `src/features/monitoring/components/metrics-time-series.tsx` — LineChart multi-série com tooltip, grid, legenda e eixos formatados
- `src/features/monitoring/components/provider-latency-chart.tsx` — BarChart horizontal com cores por status (healthy/degraded/down/warning)
- `src/features/monitoring/components/system-metrics-panel.tsx` — Painel combinado com gráficos de latência P95 e throughput

**Integração:** Dashboard principal (`/dashboard`) exibe os gráficos em grid 2/3 + 1/3.

**Veredito:** ⚠️ **Parcial.** Recharts está implementado e em uso. D3.js, Chart.js e ECharts ausentes, mas Recharts por si só já cobre o requisito principal.

---

### 2.3 Testes (Vitest + Testing Library + Cypress)

| Ferramenta | No projeto | Observação |
|-----------|-----------|------------|
| Jest | ⚠️ | **Vitest** como substituto moderno (API compatível, ~10x mais rápido) |
| Cypress | ✅ | Configurado com `cypress.config.ts`, suporte a login customizado, testes E2E |
| Testing Library | ✅ | `@testing-library/react` + `@testing-library/jest-dom` + `@testing-library/user-event` |

**Testes implementados:**
- **Unitários (Vitest + Testing Library):** 60 testes em 3 arquivos
  - `button.test.tsx` — 9 testes: renderização, variantes, tamanhos, eventos, ref, disabled
  - `utils.test.ts` — 24 testes: slugify, truncate, pluralize, capitalize, titleCase, queryString, clamp, range, omit, pick
  - `format.test.ts` — 27 testes: datas relativas, bytes, porcentagens, duração, latência, throughput, error rate
- **E2E (Cypress):** 2 spec files
  - `dashboard.cy.ts` — 8 testes: navegação, cards, gráficos, dark mode
  - `system-health.cy.ts` — 5 testes: KPIs, providers, infraestrutura, activity feed, live indicator

**Comandos:**
```bash
npm test           # Vitest run
npm run test:watch # Vitest watch
npm run test:e2e   # Cypress headless
npm run test:e2e:open # Cypress UI
```

**Veredito:** ✅ **Atende.** Testes automatizados implementados com Vitest (equivalente ao Jest), Testing Library e Cypress.

---

### 2.4 Monitoramento (Datadog RUM, Sentry, Web Vitals)

| Ferramenta | No projeto | Observação |
|-----------|-----------|------------|
| Datadog RUM | ❌ | Ausente (pago, pode ser adicionado via trial) |
| Sentry | ❌ | Ausente (gratuito, pode ser adicionado facilmente) |
| Web Vitals | ✅ | Integrado via `useReportWebVitals` do Next.js |

**Web Vitals implementado:**
- Componente `WebVitals` em `src/components/providers/web-vitals.tsx`
- Reporta LCP, FID, CLS, FCP, TTFB, INP via logger estruturado
- Envia para endpoint configurável via `NEXT_PUBLIC_WEB_VITALS_ENDPOINT`
- Incluído no root layout (`src/app/layout.tsx`)

**Veredito:** ⚠️ **Parcial.** Web Vitals integrado. Datadog RUM e Sentry ausentes, mas podem ser adicionados com baixo esforço.

---

### 2.5 Domínio ML/LLM/MLOps

| Aspecto | O que a vaga pede | O que o projeto entrega |
|---------|------------------|------------------------|
| LLM | Conhecimento em LLM | Domain model com **8 provedores de IA** (OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Cohere, HuggingFace) + AWS/Azure/Custom. Tipos para provedores, status de saúde, latência |
| MLOps | Conhecimento em MLOps | **Core da plataforma:** Model Registry (ciclo de vida, versões, estratégias de rollout), Experiment Tracking (runs, métricas, params, artefatos), Deployment Manager (canary, blue-green, rolling, recreate), Pipeline DAG (stages de treino, eval, deploy, data-processing), Dataset Manager (schema, estatísticas, formatos), System Health (GPU, fila, cache, vector-db, inferência) |

**Veredito:** ✅ **Atende plenamente.** O domínio de ML/LLM/MLOps é o coração do projeto, com tipos ricos, mocks realistas e features bem organizadas.

---

### 2.6 Arquitetura (Design Systems, Micro-frontends, Developer Portals, Admin Panels, Data Platforms)

| Requisito | Status | Análise |
|-----------|--------|---------|
| Design Systems | ✅ | **Custom design system interno:** Button (6 variantes, 4 tamanhos, asChild), Badge (6 variantes, 3 tamanhos), Skeleton (shimmer animation), DataTable (genérico com sort, pagination, expand, loading), Tailwind theme completo com cores semânticas (primary, secondary, destructive, success, warning, chart-1 a chart-5, sidebar-*) |
| Micro-frontends | ❌ | Monólito Next.js padrão. Sem Module Federation, Single SPA, ou qualquer padrão de micro-frontend |
| Developer Portals | ⚠️ | O projeto **funciona como um portal** (multi-página, role-based access, shell enterprise), mas não é um dev portal no sentido de Backstage/Port — não há catalog de serviços ou scorecards |
| Admin Panels | ✅ | **Enterprise Shell** completo: sidebar responsiva com overlay mobile, topbar com perfil/notificações/theme toggle, command palette (⌘K), breadcrumbs, DataTable com paginação |
| Data Platforms | ⚠️ | Feature de **datasets** com schema detailing (colunas, tipos, estatísticas), formatos (CSV, Parquet, JSONL, Image, Text), mas sem query engine, pipeline de dados ou catalog |

---

## 3. Responsabilidades vs. Projeto

| Responsabilidade da Vaga | Projeto | Status |
|-------------------------|---------|--------|
| Liderar desenvolvimento frontend com React | React 19 + Next.js 15, componentização feature-based | ✅ |
| Arquitetar fluxos de setup/configuração via interface | Fluxos mockados (model registry, deployments), sem wizard completo | ⚠️ |
| Projetar camada informacional com dashboards e visualizações | Dashboard + System Health + **Recharts** (Latency P95, Throughput, Provider Latency) | ✅ |
| Implementar fluxos de implantação de modelos via interface | Tipos e mock de deployment strategies (canary, blue-green, rolling) + APIs de backend tipadas | ✅ |
| Desenvolver monitoramento em tempo real | Event stream com intervalo de refresh + **Web Vitals** integrado | ⚠️ |
| Definir padrões de componentização, performance e acessibilidade | Design system custom, DataTable genérico, hooks reutilizáveis, Tailwind theme system | ✅ |
| Liderar revisões técnicas e garantir coerência arquitetural | Código bem estruturado: feature folders, types colados, stores separadas, lib/utils organizados | ✅ |

---

## 4. Requisitos vs. Projeto

| Requisito da Vaga | Projeto | Status |
|-------------------|---------|--------|
| React em plataformas de médio/grande porte | Next.js 15 + React 19, 7 rotas, 10 features, dezenas de componentes | ✅ |
| Domínio frontend para plataformas técnicas complexas | Plataforma MLOps completa com model registry, experiment tracking, deployments, pipelines, datasets | ✅ |
| Conhecimento em LLM e MLOps | Domain models ricos para LLM providers e ciclo de vida ML | ✅ |
| TypeScript avançado, estado complexo, componentização em escala | Strict mode, tipos profundos, Zustand + React Query + nuqs (3 camadas de estado) | ✅ |
| Integração a APIs REST complexas | TanStack React Query + HTTP client genérico + query key factory | ✅ |
| Bibliotecas de visualização (D3.js, Recharts, Chart.js, ECharts) | **Recharts implementado** (3 componentes no dashboard). D3, Chart.js, ECharts ausentes | ⚠️ |
| Design systems em ambientes multi-time | Custom design system com componentes themáveis via CSS vars | ✅ |
| Plataformas internas complexas (dev portals, MLOps UIs, admin panels, data platforms) | Cobre MLOps UIs e admin panels; dev portals e data platforms parcialmente | ⚠️ |
| Testes (Jest, Cypress, Testing Library) | **Vitest + Testing Library** (60 testes) + **Cypress** (13 testes E2E) | ✅ |
| Monitoramento frontend (Datadog RUM, Sentry, Web Vitals) | **Web Vitals** integrado. Datadog RUM e Sentry ausentes | ⚠️ |
| Micro-frontends ou arquiteturas modulares multi-time | Monólito Next.js, sem micro-frontends | ❌ |
| Vivência com usuários técnicos (engenheiros de ML/dados) | Toda a UX é desenhada para ML engineers: métricas, estratégias de deploy, pipelines, health monitoring | ✅ |

---

## 5. Conclusão

### Pontos Fortes

| Aspecto | Detalhes |
|---------|----------|
| **Stack moderna e bem estruturada** | React 19, Next.js 15 App Router, TypeScript strict, TanStack React Query, Zustand |
| **Domínio MLOps rico** | Model registry, experiment tracking, deployments, pipelines, datasets, monitoring — tudo modelado com tipos complexos |
| **Design system próprio** | Componentes UI customizados com Tailwind, tema semântico, dark mode |
| **Testes automatizados** | 60 testes unitários (Vitest + Testing Library) + 13 testes E2E (Cypress) |
| **Visualização de dados** | Recharts implementado com 3 componentes nos dashboards |
| **Web Vitals integrado** | Monitoramento de performance com LCP, CLS, FID, FCP, TTFB, INP |
| **Organização de código** | Feature folders, separação clara entre types/mocks/hooks/components/services/stores |

### Lacunas

| Lacuna | Impacto | Esforço estimado para resolver |
|--------|---------|-------------------------------|
| **D3.js / Chart.js / ECharts** | Baixo — Recharts já cobre o requisito de visualização | Baixo (adicionar biblioteca e criar wrapper) |
| **Datadog RUM / Sentry** | Moderado — sem APM/error tracking de produção | Baixo (adicionar SDKs e configurar) |
| **Micro-frontends** | Moderado — dependendo da estratégia multi-time | Alto (requer Module Federation ou migração) |
| **Developer Portal completo** | Baixo — o projeto já funciona como portal administrativo | Médio (adicionar catalog de serviços) |

### Total de Requisitos

| Status | Contagem |
|--------|----------|
| ✅ Atende | 13 |
| ⚠️ Parcial | 5 |
| ❌ Não atende | 3 |

---

## 6. Checklist de Implementação

| Data | Ação | Status |
|------|------|--------|
| Maio 2026 | Recharts implementado (LineChart, BarChart, painéis) | ✅ |
| Maio 2026 | Vitest + Testing Library configurado + 60 testes | ✅ |
| Maio 2026 | Cypress configurado + 13 testes E2E | ✅ |
| Maio 2026 | Web Vitals integrado (useReportWebVitals) | ✅ |

---

*Documento gerado em maio de 2026 para subsidiar candidatura à vaga de Frontend Engineer (MLOps/IA).*
