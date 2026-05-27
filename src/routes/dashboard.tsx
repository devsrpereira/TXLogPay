import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { motion } from "motion/react";

import {
  Shield,
  Wallet,
  TrendingUp,
  History,
  Plus,
  Inbox,
  Loader2,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useAllOperations } from "@/hooks/use-operations";
import { useAuth } from "@/hooks/use-auth";

import { formatCurrency } from "@/lib/formatters";

import {
  calculateFinancialTotal,
  calculateProtectedTotal,
  fetchUsdBaseRates,
  getProtectedAmount,
  getTotalFees,
  toUsdAmount,
  type FxRates,
} from "@/lib/financial-calculations";

import { USER_TIER_BADGE } from "@/types/profile.types";

import type { DBOperation } from "@/services/operations.db";
import type { UserTier } from "@/domain/user";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — TXLOGPAY" }],
  }),
  component: Dashboard,
});

const TRADITIONAL_LC_RATE = 0.025;

function computeKpis(
  all: DBOperation[],
  rates: FxRates,
  fxTimestamp: string | null
) {
  const active = all.filter(
    (o) =>
      o.status === "ACTIVE" ||
      o.status === "OPERATION_MONITORING"
  );

  const completed = all.filter(
    (o) =>
      o.status === "COMPLETED" ||
      o.status === "PAYMENT_RELEASED"
  );

  const counted = [...active, ...completed];

  const protectedTotal = calculateProtectedTotal(
    active,
    rates,
    fxTimestamp
  );

  const volumeTotal = calculateProtectedTotal(
    counted,
    rates,
    fxTimestamp
  );

  const feesTotal = calculateFinancialTotal(
    counted,
    getTotalFees,
    rates,
    fxTimestamp
  );

  const traditional = volumeTotal.amount * TRADITIONAL_LC_RATE;

  const savingsTotal = {
    ...volumeTotal,
    amount: Math.max(
      0,
      traditional - feesTotal.amount
    ),
  };

  return {
    protectedTotal,
    volumeTotal,
    savingsTotal,
    feesTotal,
    activeCount: active.length,
    completedCount: completed.length,
    counted,
  };
}

function monthlySeries(
  ops: DBOperation[],
  rates: FxRates,
  forceUsd: boolean
) {
  const buckets = new Map<
    string,
    {
      label: string;
      volume: number;
      count: number;
    }
  >();

  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const key = `${d.getFullYear()}-${d.getMonth()}`;

    const label = d
      .toLocaleDateString("pt-BR", {
        month: "short",
      })
      .replace(".", "");

    buckets.set(key, {
      label,
      volume: 0,
      count: 0,
    });
  }

  for (const o of ops) {
    const d = new Date(o.created_at);

    const key = `${d.getFullYear()}-${d.getMonth()}`;

    const b = buckets.get(key);

    if (b) {
      const amount = getProtectedAmount(o);

      b.volume += forceUsd
        ? toUsdAmount(amount, o.currency, rates)
        : amount;

      b.count++;
    }
  }

  return Array.from(buckets.values());
}

function Dashboard() {
  const {
    data: ops = [],
    isLoading,
    error,
  } = useAllOperations();

  const { data: fx } = useQuery({
    queryKey: ["fx", "usd-base-rates"],
    queryFn: fetchUsdBaseRates,
    staleTime: 5 * 60 * 1000,
  });

  const { profile } = useAuth();

  const tier: UserTier =
    (profile?.tier as UserTier) ?? "STANDARD";

  const tierMeta = USER_TIER_BADGE[tier];

  const k = computeKpis(
    ops,
    fx?.rates ?? { USD: 1 },
    fx?.fxTimestamp ?? null
  );

  const series = monthlySeries(
    k.counted,
    fx?.rates ?? { USD: 1 },
    k.volumeTotal.isConverted
  );

  const isNewUser = ops.length === 0;

  const fxTooltip =
    "Valores convertidos para USD com referência cambial em tempo real.";

  return (
    <AppShell
      topbar={
        <div className="hidden md:flex gap-6 text-xs font-mono uppercase tracking-widest">
          <span className="text-secondary">
            Visão Executiva
          </span>
        </div>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard Operacional
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl mt-1">
            Painel executivo das garantias ativas,
            liquidações concluídas e impacto financeiro
            consolidado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={
              "chip text-[11px] " + tierMeta.className
            }
          >
            Plano {tierMeta.label}
          </span>

          <Link
            to="/operacoes/conectar"
            className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Operação
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="card-surface p-10 text-center">
          <p className="text-destructive">
            {(error as Error).message}
          </p>
        </div>
      ) : isNewUser ? (
        <div className="card-surface p-10 text-center">
          <Inbox className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />

          <h2 className="text-xl font-semibold mb-2">
            Nenhuma operação encontrada
          </h2>

          <p className="text-sm text-muted-foreground mb-6">
            Crie sua primeira operação para visualizar
            indicadores financeiros e liquidações.
          </p>

          <Link
            to="/operacoes/conectar"
            className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Operação
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="card-surface p-5">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-secondary" />

                <span className="text-sm text-muted-foreground">
                  Total Protegido
                </span>
              </div>

              <div className="text-2xl font-bold">
                {formatCurrency(
                  k.protectedTotal.amount,
                  k.protectedTotal.currency
                )}
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="h-5 w-5 text-secondary" />

                <span className="text-sm text-muted-foreground">
                  Volume Financeiro
                </span>
              </div>

              <div className="text-2xl font-bold">
                {formatCurrency(
                  k.volumeTotal.amount,
                  k.volumeTotal.currency
                )}
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-secondary" />

                <span className="text-sm text-muted-foreground">
                  Economia Acumulada
                </span>
              </div>

              <div className="text-2xl font-bold">
                {formatCurrency(
                  k.savingsTotal.amount,
                  k.savingsTotal.currency
                )}
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-secondary" />

                <span className="text-sm text-muted-foreground">
                  Operações Concluídas
                </span>
              </div>

              <div className="text-2xl font-bold">
                {k.completedCount}
              </div>
            </div>
          </div>

          <div className="card-surface p-6 mt-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-secondary" />

              <h2 className="text-lg font-semibold">
                Volume Operacional
              </h2>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="label" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}

export default Dashboard;