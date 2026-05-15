import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { motion } from "motion/react";
import {
  Shield, CheckCircle2, TrendingUp, BarChart3, Anchor, Plane, Ship, Zap, Filter, Download, ChevronLeft, ChevronRight, Wallet,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export const Route = createFileRoute("/pagamentos")({
  head: () => ({ meta: [{ title: "Pagamentos — TXLOGPAY" }] }),
  component: Pagamentos,
});

const KPIS = [
  { label: "Garantias Ativas", value: "USD 4.8M", chip: "+12% vs. mês anterior", chipClass: "chip-success", icon: Shield },
  { label: "Pagamentos Liberados", value: "USD 12.4M", chip: "+5.2% fluxo acelerado", chipClass: "chip-success", icon: CheckCircle2 },
  { label: "Economia Total", value: "USD 482K", chip: "TX Efficiency", chipClass: "chip-cargo", icon: TrendingUp },
  { label: "Operações", value: "128", chip: "Monitoramento real-time", chipClass: "chip-info", icon: BarChart3 },
];

const ROWS = [
  { id: "TX-8829", route: "HKG > SSZ", icon: Anchor, value: "USD 142.500", fee: "USD 1.140", saving: "USD 2.420", status: "Evento Confirmado", statusClass: "chip-success" },
  { id: "TX-9104", route: "RTM > VIX", icon: Ship, value: "USD 84.200", fee: "USD 674", saving: "USD 1.280", status: "Garantia Ativa", statusClass: "chip-info" },
  { id: "TX-8744", route: "SHA > MAO", icon: Plane, value: "USD 215.000", fee: "USD 1.720", saving: "USD 3.150", status: "Pagamento Liberado", statusClass: "chip-success" },
];

const SPARK = [40, 60, 35, 80, 55, 92, 100].map((v, i) => ({ i, v }));

function Pagamentos() {
  return (
    <AppShell topbar={
      <div className="hidden md:flex gap-6 text-xs font-mono uppercase tracking-widest">
        <span className="text-muted-foreground">Visão Geral</span>
        <span className="text-secondary">Relatórios</span>
      </div>
    }>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> › <span className="text-secondary">Pagamentos</span>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pagamentos Operacionais</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoramento financeiro vinculado aos eventos das operações internacionais.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl px-4 py-2.5 text-sm border border-border hover:bg-surface-container flex items-center gap-2"><Filter className="h-4 w-4" />Filtros Avançados</button>
          <button className="rounded-xl px-4 py-2.5 text-sm border border-border hover:bg-surface-container flex items-center gap-2"><Download className="h-4 w-4" />Exportar</button>
        </div>
      </div>

      <div className="grid xl:grid-cols-5 gap-5">
        <div className="xl:col-span-4 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {KPIS.map((k, i) => (
              <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface p-5">
                <div className="flex justify-between items-start text-sm">
                  <span>{k.label}</span>
                  <k.icon className="h-4 w-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold mt-3">{k.value}</div>
                <div className="mt-3"><span className={"chip " + k.chipClass + " text-[9px]"}>{k.chip}</span></div>
              </motion.div>
            ))}
          </div>

          <div className="card-surface p-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm">Visualizar por:</span>
              <span className="chip chip-info">Garantia ativa ✕</span>
              <button className="chip chip-info opacity-60 hover:opacity-100">Evento confirmado</button>
              <button className="chip chip-info opacity-60 hover:opacity-100">Pagamento liberado</button>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                    <th className="py-3 pr-4">Operação</th>
                    <th className="py-3 pr-4">Valor Original</th>
                    <th className="py-3 pr-4">Fee TXLOGPAY</th>
                    <th className="py-3 pr-4">Economia Estimada</th>
                    <th className="py-3 pr-4">Status Operacional</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(r => (
                    <tr key={r.id} className="border-b border-border/60">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg grid place-items-center bg-surface-container-low"><r.icon className="h-4 w-4 text-secondary" /></div>
                          <div>
                            <Link to="/operacoes/$id" params={{ id: r.id }} className="font-mono font-semibold hover:text-secondary">{r.id}</Link>
                            <div className="text-[10px] text-muted-foreground font-mono">{r.route}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">{r.value}</td>
                      <td className="py-4 pr-4 font-semibold">{r.fee}</td>
                      <td className="py-4 pr-4 text-success">{r.saving}</td>
                      <td className="py-4 pr-4"><span className={"chip " + r.statusClass + " text-[10px]"}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-5 text-xs">
              <span className="text-muted-foreground">Exibindo 12 de 128 operações financeiras monitoradas</span>
              <div className="flex gap-1">
                <button className="h-8 w-8 rounded-lg border border-border grid place-items-center"><ChevronLeft className="h-3.5 w-3.5" /></button>
                <button className="h-8 w-8 rounded-lg btn-primary text-xs">1</button>
                <button className="h-8 w-8 rounded-lg border border-border text-xs">2</button>
                <button className="h-8 w-8 rounded-lg border border-border grid place-items-center"><ChevronRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>

          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold">Velocidade de Liquidação</h3>
            <p className="text-sm text-muted-foreground mt-1">Eficiência institucional comparada na liberação de recursos após a confirmação de eventos logísticos.</p>
            <div className="grid md:grid-cols-3 gap-6 mt-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2"><span className="font-mono uppercase tracking-widest text-secondary">TXLOGPAY</span><span className="font-semibold">8 segundos</span></div>
                  <div className="h-2 rounded-full bg-surface-container-low overflow-hidden"><div className="h-full w-[8%] rounded-full" style={{ background: "var(--gradient-brand)" }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2"><span className="font-mono uppercase tracking-widest text-muted-foreground">Tradicional</span><span className="text-muted-foreground">2 - 5 dias úteis</span></div>
                  <div className="h-2 rounded-full bg-surface-container-low overflow-hidden"><div className="h-full w-[100%] rounded-full bg-muted-foreground/40" /></div>
                </div>
              </div>
              <div className="text-center p-6 rounded-xl glass">
                <Zap className="h-8 w-8 text-secondary mx-auto" />
                <div className="text-3xl font-bold text-gradient mt-2">99%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">mais rápido</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: financial impact */}
        <div className="space-y-5">
          <div className="card-surface p-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, oklch(0.32 0.16 230 / 0.7), oklch(0.22 0.10 270 / 0.6))" }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Impacto Financeiro</div>
                <div className="font-semibold mt-1">Economia Acumulada</div>
              </div>
              <Wallet className="h-4 w-4 text-secondary" />
            </div>
            <div className="mt-8 text-4xl font-bold">USD<br />482.000</div>
            <div className="mt-2 text-xs"><span className="text-success">↑ 14.2%</span> <span className="font-mono uppercase tracking-widest text-muted-foreground ml-2">Crescimento mensal</span></div>
            <div className="h-20 mt-5">
              <ResponsiveContainer>
                <BarChart data={SPARK}>
                  <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                    {SPARK.map((_, i) => <Cell key={i} fill={i === SPARK.length - 1 ? "oklch(0.85 0.18 200)" : "oklch(0.85 0.18 200 / 0.4)"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <button className="mt-5 w-full rounded-xl py-3 text-sm font-semibold border border-secondary/40 hover:bg-secondary/10 inline-flex items-center justify-center gap-2">Gerar DRE Operacional →</button>
          </div>

          <div className="card-surface p-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Custo Médio P/ Operação</div>
            <div className="mt-4 text-sm">
              <div>Carta de Crédito</div>
              <div className="text-xl font-semibold text-muted-foreground">≈ USD 3.560</div>
              <div className="my-3 h-px bg-border" />
              <div className="text-secondary text-xs font-mono uppercase tracking-widest">Taxa TXLOGPAY</div>
              <div className="text-2xl font-bold text-gradient">USD 1.140</div>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex justify-between items-center"><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Atividade Recente</div><a className="text-[10px] text-secondary">Ver Todos</a></div>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <div className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-1.5 rounded-full bg-secondary shadow-[0_0_8px_oklch(0.85_0.18_200)]" />
                  <div><div className="font-semibold">Chegada Confirmada</div><div className="text-xs text-muted-foreground">Operação TX-8829 | Porto de Santos</div><div className="mt-1 inline-block chip chip-success text-[9px]">Gatilho de pagamento ativado</div></div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 mt-1.5 rounded-full bg-accent" />
                <div><div className="font-semibold">Manifesto Liberado</div><div className="text-xs text-muted-foreground">Operação TX-9104 | Alfândega VIX</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
