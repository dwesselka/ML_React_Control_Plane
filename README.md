# ML Control Plane

**Enterprise Platform de Machine Learning Operations e AI Observability**

Uma plataforma moderna para gerenciar modelos, experimentos, deployments e pipelines de ML em escala — inspirada em Datadog, Vercel AI, Harness e Grafana.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TailwindCSS |
| Linguagem | TypeScript strict |
| Estado global | Zustand |
| Server state | TanStack Query |
| Gráficos | Recharts |
| Ícones | Lucide React |
| Formulários | Zod |
| Tema | next-themes (dark/light) |

## Estrutura

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/login        # Login page
│   └── (dashboard)/        # Dashboard pages
│       └── dashboard/
├── components/
│   ├── layout/             # Sidebar, Header, Shell
│   ├── providers/          # ThemeProvider, QueryProvider
│   ├── dashboard/          # Dashboard cards
│   └── ui/                 # Button, Skeleton
├── features/               # Feature-based architecture
│   ├── models/             # Modelos de ML
│   ├── experiments/        # Experimentos
│   ├── deployments/        # Deployments
│   ├── datasets/           # Datasets
│   ├── pipelines/          # Pipelines
│   ├── monitoring/         # Métricas e observabilidade
│   └── settings/           # Configurações
├── services/               # API client
├── stores/                 # Zustand stores
│   ├── ui-store.ts         # Sidebar, modais, painéis
│   └── app-store.ts        # Notificações, online status
├── hooks/                  # Custom hooks
│   ├── use-media-query.ts  # Breakpoints responsive
│   ├── use-debounce.ts     # Debounce values
│   ├── use-interval.ts     # setInterval declarativo
│   ├── use-local-storage.ts
│   └── use-copy-to-clipboard.ts
├── lib/                    # Utilitários
│   ├── utils.ts            # cn, slugify, debounce, throttle
│   ├── format.ts           # date, bytes, percentage, latency
│   ├── http.ts             # HTTP client tipado
│   ├── query-keys.ts       # Query key factory pattern
│   ├── validation.ts       # Zod schemas
│   ├── constants.ts        # Rotas, query keys, intervals
│   ├── env.ts              # Validação de env vars
│   └── logger.ts           # Logger estruturado
├── mocks/                  # Mock data para apresentação
│   ├── data/               # models, experiments, deployments, metrics
│   └── factories/          # Geradores programáticos
└── types/                  # Tipos compartilhados
```

## Visual

### Paleta Dark Premium

- **Fundo**: zinc 950 (`#09090b`)
- **Superfícies**: zinc 900/800 (`#18181b` / `#27272a`)
- **Accent**: orange enterprise (`#F97316`)
- **Bordas**: zinc 800 (`#27272a`)
- **Texto**: zinc 50 (`#fafafa`)
- **Muted**: zinc 400 (`#a1a1aa`)

### Inspiração Visual

| Plataforma | Elemento |
|---|---|
| Datadog | Gráficos de série temporal, status dots |
| Vercel AI | Typography limpa, glass panels |
| Harness | Pipeline visualization, deployment strategies |
| Grafana | Dashboard métrico, time range selector |

## Funcionalidades Implementadas

### Tela de Login (IA-themed)
- **Neural canvas background** — animação de partículas com conexões simulando rede neural
- **Typewriter effect** — taglines rotativas estilo "Monitor. Deploy. Scale. Repeat."
- **Animated counters** — métricas com contagem animada (12 Models Active, 2.4M Predictions)
- **Split layout** — brand panel à esquerda, formulário à direita (responsive)
- **Mock auth** — qualquer email/senha, seta cookie de sessão

### Dashboard
- **StatCards** — overview cards (Active Models, Running Experiments, etc.)
- **Loading skeletons** — shimmer animation
- **Error/not-found** — páginas de erro estilizadas

### Layout
- **Sidebar** — navegação com ícones Lucide, 7 rotas principais
- **Header** — theme toggle dark/light
- **Dashboard shell** — layout responsivo

### Stores (Zustand)
- **ui-store**: sidebar state, panels, modals, sheets
- **app-store**: notificações, online status, ready state

### Hooks
- `useMediaQuery`, `useBreakpoint`, `useIsMobile`
- `useDebounce`, `useInterval`, `useLocalStorage`, `useCopyToClipboard`

### Lib Utils
- `cn()` — Tailwind class merge
- `formatDate`, `formatRelativeTime`, `formatBytes`, `formatLatency`, `formatThroughput`
- `queryKeys` — factory pattern para TanStack Query
- Zod validation schemas
- Logger estruturado com níveis debug/info/warn/error

### Mock Data
- 5 modelos (sentiment-analyzer, fraud-detector, image-classifier, etc.)
- 3 experimentos com runs
- 4 deployments com estratégias blue-green/canary/rolling
- Séries temporais de métricas (latency, throughput, error rate)
- Factory functions para gerar dados programaticamente

## Scripts

```bash
npm run dev          # Dev server
npm run dev:turbo    # Dev com Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier check
npm run format:fix   # Prettier fix
```

## Próximos Passos (Sugestão)

1. Integração com API real (substituir mock data)
2. Autenticação JWT real
3. Gráficos de monitoramento com Recharts
4. Páginas de detalhe (model detail, experiment runs, deployment metrics)
5. Pipeline DAG visualization
6. WebSocket para métricas em tempo real
7. Testes (Vitest + Testing Library)
8. Internacionalização (next-intl)
