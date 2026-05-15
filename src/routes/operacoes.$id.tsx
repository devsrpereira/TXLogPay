import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { motion } from "motion/react";
import {
  CheckCircle2, Lock, Network, Key, Zap, Clock, Shield, FileText, Crown, Infinity, AlertCircle, Plug,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";

export const Route = createFileRoute("/operacoes/$id")({
  head: ({ params }) => ({ meta: [{ title: `Operação ${params.id} — TXLOGPAY` }] }),
  component: OperacaoDetail,
});

const TIMELINE = [
  { d: "02/05", t: "DUIMP registrada", s: "Transmissão realizada com sucesso via API Siscomex." },
  { d: "03/05", t: "Documentos validados", s: "Conformidade documental atestada pelo sistema TXLOGPAY." },
  { d: "05/05", t: "Parametrização aduaneira", s: "Processo direcionado para análise fiscal." },
  { d: "07/05", t: "Canal verde identificado", s: "Liberação sem necessidade de conferência física ou documental." },
  { d: "07/05 · 14:32", t: "Carga desembaraçada", s: "Status oficial atualizado: Desembaraço concedido.", highlight: true },
  { d: "07/05 · 14:32:08", t: "Pagamento liberado automaticamente", s: "Condição satisfeita. Liquidação imediata do câmbio via Proteção Financeira vinculada.", accent: true },
];

const COMPARISON = [
  { name: "Carta de Crédito Tradicional", value: 3560, fill: "oklch(0.65 0.20 25)" },
  { name: "TXLOGPAY Standard (0,80%)", value: 1140, fill: "oklch(0.85 0.18 200)" },
];

function OperacaoDetail() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> ›{" "}
        <Link to="/operacoes" className="hover:text-foreground">Operações</Link> ›{" "}
        <span className="text-secondary">{id}</span>
      </div>

      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Operação {id}</h1>
          <p className="text-sm text-muted-foreground mt-1">Importação marítima · China → Santos/SP</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl px-4 py-2.5 text-sm border border-border hover:bg-surface-container flex items-center gap-2"><FileText className="h-4 w-4" /> Relatório PDF</button>
          <button className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2"><Zap className="h-4 w-4" /> Atualizar Status</button>
        </div>
      </div>

      {/* Hero event card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-7 relative overflow-hidden ring-1 ring-secondary/30">
        <div className="absolute right-6 top-6"><Shield className="h-5 w-5 text-secondary" /></div>
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-10 w-10 text-secondary shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold leading-snug">
              Evento aduaneiro identificado: Desembaraço confirmado pela Receita Federal.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              Evento gatilho confirmado: <strong className="text-foreground">Carga desembaraçada pela Receita Federal.</strong> O <span className="text-secondary">Pagamento Protegido</span> foi liberado instantaneamente com base nos dados do Siscomex.
            </p>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-3">Fonte: Siscomex Portal Único</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">
          {[
            { icon: Lock, label: "Proteção Financeira" },
            { icon: Network, label: "Canal Verde" },
            { icon: Key, label: "Liberação" },
            { icon: Zap, label: "Liquidação" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center relative">
              <div className="h-11 w-11 rounded-xl grid place-items-center" style={{ background: i === 3 ? "var(--gradient-brand)" : "color-mix(in oklab, var(--secondary) 12%, transparent)" }}>
                <s.icon className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 text-xs">
          <span className="text-secondary inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Liquidação executada em 8 segundos</span>
          <span className="text-muted-foreground">Liquidação vinculada ao evento aduaneiro</span>
        </div>
      </motion.div>

      {/* Info row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Importador", value: "LogiCorp S.A.", sub: "CNPJ: 12.345.678/0001-90" },
          { label: "Exportador", value: "Ningbo Global Trade", sub: "Zhejiang, CN" },
          { label: "Invoice", value: "INV-2024-8829", sub: "USD 142,500.00" },
          { label: "BL / ETA", value: "MSC ROSA", sub: "12/05/2024" },
        ].map(c => (
          <div key={c.label} className="card-surface p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
            <div className="font-semibold mt-1">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Main split */}
      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Eficiência */}
          <div className="card-surface p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Eficiência Financeira</h3>
                <p className="text-xs text-muted-foreground mt-1">Comparativo de custos e taxas operacionais (USD)</p>
              </div>
              <span className="chip chip-info text-[10px]">Plano Atual: Standard</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl glass">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Detalhamento de Taxas</div>
                <div className="flex justify-between mt-3"><div><div className="font-semibold">Fee Operacional Standard</div><div className="text-[11px] text-muted-foreground">Variável conforme volume operacional</div></div><div className="text-2xl font-bold text-gradient">0,80%</div></div>
                <div className="flex justify-between mt-4 opacity-70"><div><div>Fee Enterprise (Upgrade disponível)</div></div><div className="text-lg font-semibold">0,45%</div></div>
              </div>
              <div className="p-4 rounded-xl glass">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Economia vs. Mercado</div>
                <div className="h-32 mt-3">
                  <ResponsiveContainer>
                    <BarChart data={COMPARISON} layout="vertical" margin={{ left: 0, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ background: "oklch(0.20 0.09 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} label={{ position: "right", fill: "var(--foreground)", fontSize: 11, formatter: (v: number) => `USD ${v.toLocaleString()}` }}>
                        {COMPARISON.map((c, i) => <Cell key={i} fill={c.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm">Economia Estimada <span className="text-secondary font-semibold">USD 2.420</span></div>
                <div className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent">Potencial Enterprise</div>
                  <div className="flex justify-between text-xs mt-1"><span>Com upgrade Enterprise (0,45%)</span><span className="font-semibold">USD 641</span></div>
                  <div className="flex justify-between text-xs"><span>Economia adicional possível</span><span className="font-semibold">USD 499</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card-surface p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Timeline de Alfândega</h3>
              <span className="chip chip-info text-[10px]"><span className="pulse-dot before:inline-block before:mr-1.5"></span>Monitoramento em Tempo Real</span>
            </div>
            <div className="mt-6 relative pl-6">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-5">
                {TIMELINE.map((e, i) => (
                  <div key={i} className="relative">
                    <div className={"absolute -left-5 top-1 h-3 w-3 rounded-full ring-2 ring-background " + (e.accent ? "bg-accent shadow-[0_0_12px_oklch(0.70_0.24_320)]" : e.highlight ? "bg-secondary shadow-[0_0_12px_oklch(0.85_0.18_200)]" : "bg-muted-foreground")} />
                    <div className={"p-4 rounded-xl " + (e.accent ? "bg-accent/10 border border-accent/30" : e.highlight ? "bg-secondary/10 border border-secondary/30" : "")}>
                      <div className="text-sm font-semibold">{e.d} — {e.t}</div>
                      <div className="text-xs text-muted-foreground mt-1">{e.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Liquidation summary */}
          <div className="card-surface p-6 ring-1 ring-accent/30">
            <h3 className="text-lg font-semibold">Liquidação Pós-Desembaraço</h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Valor protegido</span><span className="font-semibold">USD 142.500,00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Taxa fixada (VET)</span><span>USD 1.0000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status Proteção</span><span className="text-secondary inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" />Concluída</span></div>
            </div>
            <div className="mt-5 p-4 rounded-xl glass flex items-center gap-3">
              <Zap className="h-5 w-5 text-accent" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Confirmação</div>
                <div className="font-semibold text-sm">Liquidação concluída</div>
              </div>
            </div>
          </div>

          {/* Upgrade Enterprise */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2"><Crown className="h-4 w-4 text-accent" /><h3 className="text-lg font-semibold">Upgrade Enterprise</h3></div>
            <div className="mt-4 space-y-4 text-sm">
              {[
                { i: Zap, t: "Menor fee operacional (0,45%)", s: "Taxa exclusiva reduzida para altos volumes." },
                { i: Infinity, t: "Operações ilimitadas", s: "Sem limites mensais de volume transacionado." },
                { i: AlertCircle, t: "Prioridade operacional", s: "Fila de processamento dedicada e suporte 24/7." },
                { i: Plug, t: "Integração API", s: "Conecte seus sistemas diretamente ao fluxo aduaneiro." },
              ].map(b => (
                <div key={b.t} className="flex gap-3">
                  <b.i className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">{b.t}</div>
                    <div className="text-xs text-muted-foreground">{b.s}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-5 italic">Condições personalizadas conforme volume transacional.</div>
            <button className="mt-4 w-full rounded-xl py-3 font-semibold text-sm" style={{ background: "var(--gradient-accent)" }}>Solicitar Upgrade</button>
          </div>

          {/* Documentation */}
          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold mb-4">Documentação</h3>
            <div className="space-y-2">
              {["Commercial_Invoice.pdf", "Packing_List_8829.pdf", "Master_BL_Ningbo.pdf"].map(d => (
                <div key={d} className="flex items-center justify-between p-3 rounded-lg glass text-sm">
                  <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" />{d}</span>
                  <span className="chip chip-success text-[9px]">Validado</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
