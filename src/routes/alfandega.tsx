import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { motion } from "motion/react";
import { Search, RefreshCw, Filter, Download, Truck, Plane, Anchor, CheckCircle2, Radar, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/alfandega")({
  head: () => ({ meta: [{ title: "Alfândega — TXLOGPAY" }] }),
  component: Alfandega,
});

const KPIS = [
  { label: "Operações Monitoradas", value: "128", chip: "+5.2%", chipClass: "chip-info", icon: Search, progress: 70 },
  { label: "Canal Verde", value: "84", chip: "65% do total", chipClass: "chip-success", icon: CheckCircle2 },
  { label: "Em Análise", value: "18", chip: "Prioridade Alta", chipClass: "chip-cargo", icon: Radar, progress: 30 },
  { label: "Eventos Sincronizados", value: "2.4K", chip: "Last 24h · Latência 12ms", chipClass: "chip-info", icon: RefreshCw },
];

const ROWS = [
  { id: "TX-8829-BR", origin: "SANTOS DOCK A4", port: "Shanghai, CN", canal: "Verde", event: "Desembaraço Confirmado", time: "Hoje, 14:32", status: "Evento confirmado", icon: Truck },
  { id: "TX-9012-US", origin: "VIRACOPOS AIR", port: "Miami, US", canal: "Em Análise", event: "Aguardando Inspeção", time: "Hoje, 11:20", status: "Monitoramento ativo", icon: Plane },
  { id: "TX-4432-PY", origin: "FOZ DO IGUAÇU", port: "Assunção, PY", canal: "Amarelo", event: "Documentação Pendente", time: "Hoje, 09:45", status: "Monitoramento ativo", icon: Truck },
  { id: "TX-7718-DE", origin: "PARANAGUÁ PORT", port: "Hamburg, DE", canal: "Verde", event: "Carga Liberada", time: "Ontem, 18:00", status: "Protegido", icon: Anchor },
];

const canalChipClass = (c: string) => c === "Verde" ? "chip-success" : c === "Amarelo" ? "chip-warning" : "chip-cargo";

function Alfandega() {
  return (
    <AppShell>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> › <span className="text-secondary">Alfândega</span>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Painel de Controle Aduaneiro</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Acompanhamento em tempo real dos eventos operacionais vinculados às importações monitoradas através de inteligência logística integrada.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl px-4 py-2.5 text-sm border border-border hover:bg-surface-container flex items-center gap-2"><Filter className="h-4 w-4" />Filtros Avançados</button>
          <button className="rounded-xl px-4 py-2.5 text-sm border border-border hover:bg-surface-container flex items-center gap-2"><Download className="h-4 w-4" />Exportar Relatório</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {KPIS.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface p-5">
            <div className="flex justify-between items-start">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k.label}</div>
              <k.icon className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex items-baseline gap-2 mt-3"><span className="text-3xl font-bold text-gradient">{k.value}</span><span className={"chip " + k.chipClass + " text-[9px]"}>{k.chip}</span></div>
            {k.progress && <div className="mt-3 h-1 rounded-full bg-surface-container-low overflow-hidden"><div className="h-full rounded-full" style={{ width: k.progress + "%", background: "var(--gradient-brand)" }} /></div>}
          </motion.div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mt-5">
        <div className="xl:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2"><Search className="h-4 w-4 text-secondary" />Monitoramento de Operações</h2>
            <span className="text-xs text-muted-foreground">Mostrando 8 de 128 resultados</span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="py-3 pr-4">Operação</th><th className="py-3 pr-4">Origem</th><th className="py-3 pr-4">Canal</th><th className="py-3 pr-4">Evento Atual</th><th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(r => (
                  <tr key={r.id} className="border-b border-border/60">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg grid place-items-center bg-surface-container-low"><r.icon className="h-4 w-4 text-secondary" /></div>
                        <div>
                          <Link to="/operacoes/$id" params={{ id: r.id.split("-").slice(0, 2).join("-") }} className="font-mono font-semibold hover:text-secondary">{r.id}</Link>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">{r.origin}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{r.port}</td>
                    <td className="py-4 pr-4"><span className={"chip " + canalChipClass(r.canal) + " text-[10px]"}>{r.canal}</span></td>
                    <td className="py-4 pr-4"><div>{r.event}</div><div className="text-[10px] text-muted-foreground">{r.time}</div></td>
                    <td className="py-4 pr-4 text-xs"><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-secondary" />{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6"><Link to="/operacoes" className="text-xs font-mono uppercase tracking-widest text-secondary hover:underline">Ver todas as operações monitoradas</Link></div>
        </div>

        <div className="space-y-5">
          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-secondary" />Elegibilidade para Liberação</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["Desembaraço confirmado", "Canal verde identificado", "Liberação automática habilitada"].map(t => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-5 w-5 rounded-md grid place-items-center" style={{ background: "var(--gradient-brand)" }}><CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" /></span>{t}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full mt-5 rounded-xl py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"><Zap className="h-4 w-4" /> Executar Liberação Expressa</button>
          </div>

          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2"><RefreshCw className="h-4 w-4 text-secondary" />Eventos Recentes Live</h3>
            <div className="mt-5 space-y-4 text-sm">
              {[
                { t: "14:32", s: "Desembaraço confirmado · TX-8829", c: "var(--secondary)" },
                { t: "14:31", s: "Evento sincronizado com Siscomex", c: "var(--accent)" },
                { t: "14:28", s: "Canal verde identificado pelo sistema", c: "var(--success)" },
                { t: "13:50", s: "Atracação confirmada no terminal 4", c: "var(--muted-foreground)" },
              ].map((e, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: e.c, boxShadow: `0 0 12px ${e.c}` }} />
                  <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{e.t}</div><div>{e.s}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex justify-between items-center"><span className="chip chip-info text-[10px]">Live Radar</span><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Santos Area (SSZ)</span></div>
            <div className="relative mt-5 aspect-square rounded-xl overflow-hidden grid place-items-center" style={{ background: "radial-gradient(circle, oklch(0.30 0.14 200 / 0.4), transparent 70%)" }}>
              <div className="absolute inset-4 rounded-full border border-secondary/30" />
              <div className="absolute inset-10 rounded-full border border-secondary/20" />
              <div className="absolute inset-16 rounded-full border border-secondary/10" />
              <div className="h-2 w-2 rounded-full bg-secondary animate-ping" />
            </div>
            <div className="mt-3 text-xs"><span className="text-muted-foreground">Vessel in proximity:</span><div className="font-semibold mt-1">CMA CGM MARCO POLO</div></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
