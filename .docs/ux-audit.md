# Auditoria de UX — ML Control Plane

> **Data:** Maio 2026
> **Auditor:** Principal Product Designer & Staff Frontend Engineer
> **Escopo:** UX, Acessibilidade, Consistência, Estados, Feedback de Sistema
> **Benchmark:** Datadog · Grafana · Vercel · OpenAI Platform · LangSmith · GitHub

---

## Notas Gerais

| Indicador | Nota |
|-----------|------|
| UX Geral | **4.8 / 10** |
| Maturidade Enterprise | **3.5 / 10** |
| Prontidão para Produção | **2.0 / 10** |

---

## Problemas Encontrados

---

### P001 — Zero loading states em 5 páginas

**Problema:** As páginas `/agents`, `/gateway/routing`, `/gateway/traces`, `/gateway/prompts` e `/gateway/playground` não têm estado de loading. O usuário vê uma tela em branco ou o conteúdo aparece subitamente sem transição.

**Impacto:** Alto

**Evidência:** Nenhuma dessas páginas usa `mounted` state pattern, skeleton components ou `loading.tsx`. `/agents` renderiza mock data diretamente sem qualquer verificação de prontidão.

**Recomendação:** Adicionar `loading.tsx` para cada rota. Para as páginas client-side, implementar o `mounted` pattern já usado em `/system-health` e `/models`.

**Exemplo Enterprise:** Datadog renderiza skeletons de tamanhos realistas que correspondem ao layout final. Grafana mostra painéis esqueleto com animações suaves.

---

### P002 — Apenas um error boundary para toda a aplicação

**Problema:** Existe apenas `src/app/error.tsx` raiz. Um erro em qualquer página quebra o layout inteiro, incluindo sidebar e topbar. Não há isolamento de erros por rota.

**Impacto:** Crítico

**Evidência:** Nenhum `error.tsx` em subdiretórios. O error boundary raiz envolve todo o conteúdo incluindo navegação.

**Recomendação:** Adicionar error boundaries em cada grupo de rotas:
- `src/app/(dashboard)/error.tsx` — para isolar erros do dashboard
- `src/app/(auth)/error.tsx` — para erros de autenticação
- Error boundaries individuais para formulários críticos

**Exemplo Enterprise:** Vercel mantém navegação global mesmo quando uma página quebra. GitHub mostra erro inline no componente, não na página inteira.

---

### P003 — Nenhum feedback de ação para o usuário

**Problema:** Ações como "Toggle routing rule", "New Prompt", "New Rule" não produzem toast, snackbar ou qualquer feedback de sucesso/erro. O usuário não sabe se a ação foi realizada.

**Impacto:** Alto

**Evidência:** `sonner` (Toast library) está instalado e configurado (`<Toaster>`) no layout raiz, mas nenhuma página o utiliza.

**Recomendação:** Envolver todas as ações do usuário com `toast.success()` / `toast.error()`:
- Alternar status de regra de roteamento
- Criar prompt/regra (simulado)
- Ações de tabela (archive, delete)

**Exemplo Enterprise:** Linear e Vercel usam toasts com undo. Datadog usa snackbars para confirmação de ações.

---

### P004 — Ações destrutivas sem confirmação

**Problema:** Botões de "Archive" e "Delete" em `RoutingRulesTable` e `ModelActions` não têm diálogo de confirmação. Um clique acidental destrói dados.

**Impacto:** Crítico

**Evidência:** 
- `src/features/gateway/components/routing-rules-table.tsx:66` — `Trash2` button sem confirmação
- `src/features/models/components/model-actions.tsx` — "Archive", "Delete" sem confirmação

**Recomendação:** Implementar `confirm()` ou preferencialmente um modal de confirmação estilizado:
```tsx
<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone...</AlertDialogDescription>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Delete</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

**Exemplo Enterprise:** GitHub sempre pede confirmação com o nome do recurso a ser deletado. Vercel força digitar "DELETE" para ações irreversíveis.

---

### P005 — Playground: sem cancelamento, sem streaming, sem progresso

**Problema:** O Playground simula uma requisição de 1.2s com apenas um spinner infinito. Não é possível cancelar. Não há indicação de progresso. Não simula streaming (tokens chegando um a um).

**Impacto:** Alto

**Evidência:** `src/features/gateway/components/routing-result.tsx` mostra resultado completo de uma vez. `playground-form.tsx` só desabilita o botão durante loading.

**Recomendação:**
1. Adicionar botão "Cancel" durante a geração
2. Simular streaming com caractere por caractere no output
3. Adicionar barra de progresso indeterminada com etapas (analysing → routing → generating)
4. Usar `AbortController` para o cancelamento

**Exemplo Enterprise:** OpenAI Platform mostra streaming real com cursor piscando. Cursor permite cancelar geração a qualquer momento. Claude mostra pensamento antes de responder.

---

### P006 — Nenhum estado offline

**Problema:** Se a API ou o backend ficar indisponível, o usuário não vê nenhum indicador. Os dados mockados continuam aparecendo como se tudo estivesse normal.

**Impacto:** Alto

**Evidência:** Nenhuma página verifica `navigator.onLine` ou expõe status de conexão. O hook `useAppStore` tem campo `online` mas não é utilizado.

**Recomendação:** Implementar OnlineStatusProvider que monitora conectividade:
1. Banner persistente "You are offline. Showing cached data."
2. Desabilitar ações que exigem backend
3. Indicador no topbar (padrão Slack/Linear)

**Exemplo Enterprise:** Linear mostra banner "You're offline" com lista de mudanças pendentes. Datadog mostra "Data may be stale" quando perde conexão.

---

### P007 — Tabelas sem funcionalidades enterprise

**Problema:** `DataTable` suporta apenas sort e paginação básica. Faltam: busca global, filtros por coluna, export CSV/JSON, seleção múltipla, bulk actions, ajuste de colunas, row virtualization.

**Impacto:** Alto

**Evidência:** `src/components/ui/data-table.tsx` — 267 linhas, sem nenhuma dessas features.

**Recomendação:** Priorizar:
1. **Busca global** — input de search que filtra todas as colunas
2. **Export CSV** — botão que baixa dados visíveis
3. **Seleção múltipla** — checkbox por linha + select all
4. **Bulk actions** — barra de ações quando itens selecionados
5. **Row count** — "Showing X of Y results" (já existe parcialmente)

**Exemplo Enterprise:** Datadog tem "Columns" dropdown, "Export" sempre visível, "Share view". Grafana tem "Inspect" em cada linha.

---

### P008 — Model Registry sem ciclo de vida visual

**Problema:** O Model Registry não mostra visualmente o ciclo de vida de um modelo (development → staging → production → deprecated → archived). Não há pipeline visual de deploy.

**Impacto:** Médio

**Evidência:** Em `model-table.tsx`, o status é apenas um badge textual. O drawer de detalhes lista versões em texto.

**Recomendação:** Adicionar:
1. Status pipeline visual (bolinhas conectadas tipo GitHub Actions)
2. Linha do tempo de deploy com rollbacks marcados
3. Badge de ambiente com cor consistente (dev=blue, staging=yellow, prod=green)

**Exemplo Enterprise:** Azure ML Studio mostra pipeline visual com stages. Hugging Face mostra card de deploy com status claro.

---

### P009 — Nenhuma página de Settings implementada

**Problema:** A sidebar linka para `/settings`, mas a página não existe (apenas tipos em `src/features/settings/types/`). Causa 404 ou tela em branco.

**Impacto:** Alto

**Evidência:** Sidebar lista "Settings". Tipos existem. Página não foi criada.

**Recomendação:** Implementar página de Settings com abas: Profile, Team, API Keys, Billing. Ou pelo menos uma página placeholder funcional.

**Exemplo Enterprise:** Vercel tem settings completas com validação inline e auto-save.

---

### P010 — Agentes sem estado de loading e sem filtros

**Problema:** A página `/agents` renderiza mock data instantaneamente sem skeleton. Não há busca, filtro por status ou categoria. 6 agent runs fixos.

**Impacto:** Médio

**Evidência:** `src/app/(dashboard)/agents/page.tsx` — apenas `useState` com mock data, sem `mounted` pattern, sem busca, sem filtro.

**Recomendação:**
1. Adicionar `mounted` state pattern com skeletons
2. Adicionar tabs/badges de filtro (All, Running, Success, Failed)
3. Adicionar busca por nome de agente

**Exemplo Enterprise:** LangSmith mostra busca + filtros + paginação na lista de runs. Grafana permite busca full-text.

---

### P011 — Duplicação de HTTP clients

**Problema:** Dois arquivos com implementação quase idêntica: `src/lib/http.ts` e `src/services/api-client.ts`. Ambos exportam para `src/services/index.ts`.

**Impacto:** Baixo (mas confunde desenvolvedores)

**Evidência:** Ambos implementam get/post/put/patch/delete com fetch, Bearer token, e `ApiResponse<T>`.

**Recomendação:** Unificar em um único client. Manter `api-client.ts`, remover `http.ts`. Atualizar imports.

**Exemplo Enterprise:** Todo projeto maduro tem um único HTTP client com interceptors (axios) ou um wrapper centralizado.

---

### P012 — React Query não utilizado para dados reais

**Problema:** TanStack React Query está configurado com Provider, DevTools e query key factory, mas nenhum hook o utiliza para fetch. Todos os hooks feature usam `setInterval` com dados mockados diretamente.

**Impacto:** Alto (para transição para API real)

**Evidência:** `useSystemHealth`, `useProviderHealth`, `useEventStream`, `useModelRegistry` — todos usam setInterval + useState, não useQuery.

**Recomendação:** Substituir setInterval por `useQuery` com `refetchInterval`. Os hooks mock podem retornar `queryFn` que resolve mock data:
```tsx
export function useSystemHealth(refreshMs = 5000) {
  return useQuery({
    queryKey: [...],
    queryFn: () => mockSystemHealthData,
    refetchInterval: refreshMs,
  });
}
```

**Exemplo Enterprise:** Qualquer app React que escala usa React Query, SWR ou Apollo. `setInterval` manual é padrão de codebase imaturo.

---

### P013 — Sem navegação por teclado em componentes interativos

**Problema:** Cards expansíveis, tabelas com row click, toggles e filtros não têm suporte adequado a teclado. Falta `tabindex`, `onKeyDown`, `aria-expanded` e `role`.

**Impacto:** Médio

**Evidência:** 
- `src/features/gateway/components/traces-table.tsx` — `<button>` sem `aria-expanded`
- `src/features/system-health/components/kpi-cards.tsx` — card não é focusable
- `src/features/providers/components/provider-card.tsx` — card não é focusable

**Recomendação:** Adicionar para todo elemento interativo:
- `tabIndex={0}` e `onKeyDown` para Enter/Space
- `aria-expanded={isExpanded}` em expansíveis
- `role="button"` em divs/buttons com onClick

**Exemplo Enterprise:** Vercel e Linear têm focus states visíveis em todos os elementos interativos.

---

### P014 — Playground sem histórico persistente

**Problema:** O histórico do playground é perdido ao recarregar a página. Além disso, o limite de 10 itens é silencioso — o usuário não sabe que itens antigos foram descartados.

**Impacto:** Baixo

**Evidência:** `playground/page.tsx:24` — `history.slice(0, 10)` sem notificação ao usuário.

**Recomendação:**
1. Persistir histórico em `localStorage` via `useLocalStorage` hook (já existe!)
2. Mostrar "Viewing 10 most recent requests" quando limite atingido
3. Adicionar botão "Clear history"

**Exemplo Enterprise:** OpenAI salva histórico de conversas no localStorage + server. LangSmith mantém histórico persistente.

---

### P015 — Sem proteção de hidratação em páginas novas

**Problema:** As páginas `/agents`, `/gateway/routing`, `/gateway/traces`, `/gateway/prompts` não usam o `mounted` state pattern. Isso pode causar hydration mismatch se algum componente depender de `window`, `document` ou `localStorage`.

**Impacto:** Médio

**Evidência:** Falta o padrão `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []);` usado nas outras páginas.

**Recomendação:** Adicionar `mounted` guard em todas as páginas client-side, padronizando com o resto do codebase.

---

### P016 — Componentização inconsistente de botões

**Problema:** A página `/gateway/playground` usa `<button>` nativo no lugar do componente `<Button>` do design system para os seletores de estratégia. Também usa botão de submit com `className` inline.

**Impacto:** Baixo (violação de design system)

**Evidência:** `playground-form.tsx` — strategy buttons usam `<button>` com classes Tailwind, não `<Button>`.

**Recomendação:** Usar componente `<Button variant={...}>` padronizado. Se não houver variant para "selector card", criar uma ou usar `Button` com `variant="outline"` customizado.

---

### P017 — Formulário de login sem feedback de erro

**Problema:** O formulário de login mostra apenas "Signing in..." durante o mock delay. Não há validação de email mal formatado, senha muito curta, ou credenciais inválidas.

**Impacto:** Alto

**Evidência:** `src/app/(auth)/login/page.tsx` — mock login sempre succeed após 1s, sem verificação de formato de email ou senha.

**Recomendação:**
1. Validação de email com regex no blur
2. Mensagem de erro para campos obrigatórios
3. Estado de erro visível para credenciais inválidas
4. Loading state no botão com spinner

**Exemplo Enterprise:** Vercel valida email inline e mostra erro específico ("Invalid email format").

---

### P018 — Tema toggle não informa estado antes da hidratação

**Problema:** O `ThemeToggle` mostra um `Sun` desabilitado antes do mount. O usuário pode clicar mas nada acontece. Não há indicação de que o sistema está carregando a preferência.

**Impacto:** Baixo

**Evidência:** `theme-toggle.tsx` — `if (!mounted) return <Button variant="ghost" size="icon" disabled><Sun /></Button>`

**Recomendação:** Mostrar o ícone correto mas desabilitado, com tooltip "Loading theme preference..." ou usar CSS `opacity-50` com indicação visual.

**Exemplo Enterprise:** Vercel mostra tema correto imediatamente via inlined script no `<head>`.

---

### P019 — Observabilidade não mostra métricas em tempo real

**Problema:** A página `/observability` mostra apenas eventos (feed). Não há métricas em tempo real (RPS, error rate, latency) que são esperadas em uma página de observabilidade.

**Impacto:** Médio

**Evidência:** `observability/page.tsx` — apenas `EventFeed`. Sem gráficos, sem métricas.

**Recomendação:** Adicionar painel de métricas ao topo da página:
- Gráfico de linha (Recharts) para RPS ao longo do tempo
- Gauge ou card para error rate
- Bar chart para latency por serviço

**Exemplo Enterprise:** Datadog mostra gráficos + eventos lado a lado. Grafana organiza em rows de painéis.

---



    
### P020 — Middleware de autenticação mock não protege rotas novas

**Problema:** O middleware checa cookie `session`, mas as rotas `/gateway/*` e `/agents` podem não estar no matcher explicitamente (depende do padrão de path).

**Impacto:** Médio

**Evidência:** `middleware.ts` — `config.matcher` exclui rotas públicas. Se as novas rotas não corresponderem ao pattern, ficam acessíveis sem auth.

**Recomendação:** Verificar se o matcher cobre `/gateway/*` e `/agents`. Adicionar testes de autenticação no Cypress.

---

## Top 20 Melhorias Prioritárias

| # | Problema | Esforço | Impacto | Tarefa |
|---|----------|---------|---------|--------|
| 1 | Error boundaries por rota | 1h | Crítico | Adicionar error.tsx em (dashboard) |
| 2 | Confirmação para ações destrutivas | 2h | Crítico | AlertDialog para delete/archive |
| 3 | Loading states faltantes | 2h | Alto | loading.tsx + skeletons para 5 páginas |
| 4 | Toast feedback para ações | 1h | Alto | Adicionar toasts em todas ações |
| 5 | Playground: cancel + streaming | 4h | Alto | AbortController + stream mock |
| 6 | Estado offline | 3h | Alto | OnlineStatusProvider + banner |
| 7 | Search em tabelas | 2h | Alto | Global search no DataTable |
| 8 | Export CSV em tabelas | 2h | Alto | Botão de export |
| 9 | Keyboard accessibility | 4h | Alto | aria-expanded, tabIndex, role |
| 10 | Settings page | 4h | Alto | Implementar página de settings |
| 11 | React Query para dados mock | 3h | Alto | Substituir setInterval por useQuery |
| 12 | Login com validação | 2h | Alto | Validação de email + error state |
| 13 | Filtros para Agent Runs | 2h | Médio | Tabs de status + search |
| 14 | Pipeline visual no Model Registry | 4h | Médio | Status pipeline com stages |
| 15 | Histórico persistente no Playground | 1h | Médio | localStorage + useLocalStorage |
| 16 | Métricas na Observabilidade | 4h | Médio | Recharts charts no topo |
| 17 | mounted pattern consistente | 1h | Médio | Padronizar todas as páginas |
| 18 | Unificar HTTP clients | 1h | Baixo | Remover http.ts duplicado |
| 19 | Consistent button usage | 1h | Baixo | Substituir buttons nativos por <Button> |
| 20 | ThemeToggle hydration | 0.5h | Baixo | Tooltip + opacity no estado desabilitado |

---

## Quick Wins (< 1 dia)

| Tarefa | Tempo | Arquivos |
|--------|-------|----------|
| Toast feedback para ações | 30min | `routing-rules-table.tsx`, `prompts/page.tsx` |
| `mounted` pattern em páginas novas | 20min | agents, routing, traces, prompts |
| `loading.tsx` para gateway/* | 30min | Criar 4 arquivos loading.tsx |
| Histórico persistente no Playground | 30min | `playground/page.tsx` + `useLocalStorage` |
| Botão de cancelar no Playground | 45min | `playground-form.tsx` + `page.tsx` |
| Unificar HTTP clients | 20min | Remover `http.ts`, atualizar imports |
| Consistent button usage | 30min | Substituir `<button>` por `<Button>` no form |

---

## Melhorias de Médio Esforço (1-3 dias)

| Tarefa | Tempo |
|--------|-------|
| Error boundaries por rota | 1h |
| Confirmação para ações destrutivas | 2h |
| Estado offline completo | 3h |
| Search + Export no DataTable | 4h |
| Login com validação real | 2h |
| Filtros para Agent Runs | 2h |
| Settings page funcional | 4h |

---

## Melhorias de Alto Impacto (> 3 dias)

| Tarefa | Tempo | Justificativa |
|--------|-------|---------------|
| Playground: streaming + cancel + progresso | 6h | Experiência central do produto. Define percepção de qualidade. |
| Substituir setInterval por React Query | 4h | Pré-requisito para migrar de mock para API real |
| Pipeline visual no Model Registry | 6h | Funcionalidade core de MLOps. Esperada por ML engineers. |
| Acessibilidade completa (audit + fixes) | 8h | Requisito enterprise. Impede adoção em empresas reguladas. |
| DataTable enterprise (bulk actions, export, column config) | 8h | Esperado em qualquer admin panel. |

---

## Riscos para Usuários Finais

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Perda de dados por falta de confirmação | Alta | Alto | AlertDialog ASAP |
| Frustração por falta de feedback | Alta | Médio | Toasts + skeletons |
| Abandono por performance percebida | Média | Alto | Skeletons + progress bars |
| Confusão por dados offline parecendo reais | Média | Alto | OnlineStatusProvider |
| Inacessibilidade para usuários com deficiência | Alta | Médio | Auditoria de a11y |

---

## O que impediria aprovação por um Principal Engineer

1. **"Isso não é production-ready, são dados mockados."** — Cada página diz "este recurso não existe". Não há graceful degradation. O Principal Engineer espera ver uma camada de abstração que separe UI de dados, para que migrar de mock para API real seja trivial.

2. **"Onde está a teste de integração?"** — Os 60 testes unitários testam utilitários e botões. Zero testes de integração para fluxos completos (login → navegar → agir → ver resultado).

3. **"React Query não está sendo usado."** — Configurar React Query e não usá-lo é um anti-pattern. O Principal Engineer espera ver `useQuery` com `queryFn` mockada que possa ser substituída por `fetch` real sem mudar componentes.

4. **"O monolito Next.js vai precisar de Module Federation em 3 meses."** — Sem micro-frontends, sem module federation, sem shared component library. O Principal Engineer quer ver a arquitetura pensando no multi-time.

5. **"Zero observabilidade no frontend."** — Web Vitals está integrado, mas não há RUM real, não há tracing de erros com source maps, não há logging estruturado no backend.

---

## Fluxo UX Crítico: Playground

```
Estado atual:

[digita prompt] → [clica Send] → [spinner 1.2s] → [resultado completo aparece]

Problemas:
- Sem previsão de custo ANTES de enviar
- Sem cancelamento
- Sem streaming
- Sem retry
- Erro não tratado

Fluxo esperado para produto enterprise:

[digita prompt]
  ↓
[análise instantânea mostra task type + complexity + estimated cost]
  ↓
[clica Send]
  ↓
[etapas aparecem em tempo real: Analyzing... → Routing... → Generating...]
  ↓
[streaming do output com cursor piscando]
  ↓
[botão Cancel sempre visível]
  ↓
[ao final: Copy, Retry, Share, Save as template]
```

---

## Benchmark por Produto

| Aspecto | ML Control Plane | Datadog | Vercel | OpenAI Platform | LangSmith |
|---------|-----------------|---------|--------|----------------|-----------|
| Loading states | ❌ Parcial | ✅ Excelente | ✅ Excelente | ✅ Excelente | ✅ Bom |
| Error handling | ❌ Raiz apenas | ✅ Granular | ✅ Granular | ✅ Granular | ✅ Bom |
| Empty states | ❌ Ausente | ✅ Presente | ✅ Presente | ✅ Presente | ✅ Presente |
| Streaming | ❌ Não | N/A | ✅ Sim | ✅ Sim | ✅ Sim |
| Cancelamento | ❌ Não | N/A | ✅ Sim | ✅ Sim | ✅ Sim |
| Teclado | ❌ Mínimo | ✅ Completo | ✅ Completo | ✅ Completo | ✅ Bom |
| Confirmações | ❌ Ausente | ✅ Presente | ✅ Presente | ✅ Presente | ✅ Presente |
| Toasts/Feedback | ❌ Não usado | ✅ Snackbars | ✅ Toasts | ✅ Toasts | ✅ Toasts |
| Export dados | ❌ Não | ✅ CSV/JSON | ✅ JSON | ✅ Copy | ✅ CSV |
| Tema escuro | ✅ Bom | ✅ Excelente | ✅ Excelente | ✅ Bom | ✅ Bom |

---

## Roadmap de Evolução UX

### Sprint 1 (3 dias)
- ✅ Loading states para todas as páginas
- ✅ Toast feedback para todas ações
- ✅ Confirmação para ações destrutivas
- ✅ Error boundaries por rota
- ✅ mounted pattern consistente

### Sprint 2 (5 dias)
- ✅ Playground com streaming + cancel + progresso
- ✅ Busca global + export CSV no DataTable
- ✅ Estado offline + banner
- ✅ Unificar HTTP clients
- ✅ Usar React Query nos hooks mock

### Sprint 3 (5 dias)
- ✅ Pipeline visual no Model Registry
- ✅ Métricas em tempo real na Observabilidade
- ✅ Settings page funcional
- ✅ Login com validação inline

### Sprint 4 (10 dias)
- ✅ DataTable enterprise (bulk actions, column config, virtualização)
- ✅ Acessibilidade (auditoria + tooltips + aria + keyboard nav)
- ✅ Testes de integração para fluxos críticos
- ✅ Filtros avançados em todas as listas

---

*Documento gerado em maio de 2026. Auditoria baseada em análise estática de código e review de UX, sem execução em produção.*
