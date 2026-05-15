import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { motion } from "motion/react";
import {
  FileText, CreditCard, Lock, EyeOff, Clock, Smile, ShieldCheck, Eye, Check, ArrowLeftRight,
} from "lucide-react";

export const Route = createFileRoute("/operacoes/conectar")({
  head: () => ({ meta: [{ title: "Conectar Operação — TXLOGPAY" }] }),
  component: Conectar,
});

function Conectar() {
  return (
    <AppShell>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link> ›{" "}
        <Link to="/operacoes" className="hover:text-foreground">Operações</Link> ›{" "}
        <span className="text-secondary">Garantia Operacional</span>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Conectar uma Operação</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Monitore eventos aduaneiros e proteja pagamentos de operações já registradas.
          </p>
        </div>
        <span className="chip chip-cargo text-[11px]"><ShieldCheck className="h-3.5 w-3.5" />Garantia operacional ativa</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Operation data */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-5"><FileText className="h-4 w-4 text-secondary" />Dados da Operação</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Número DUIMP / DI" value="24/0045821-0" />
              <Field label="BL / AWB" value="HLCUBSC24010582" />
              <Field label="Invoice comercial" value="INV-2024-08892" />
              <Field label="Valor da operação (USD)" value="48.500,00" highlight />
            </div>
          </motion.div>

          {/* Garantia methods */}
          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-5"><CreditCard className="h-4 w-4 text-secondary" />Métodos de Garantia</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl glass p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Depósito de garantia operacional</div>
                <div className="flex justify-between items-center mt-2"><div className="font-semibold">Opção 1: PIX</div><span className="chip chip-success text-[10px]">⚡ Instantâneo</span></div>
                <div className="mt-5 mx-auto h-40 w-40 rounded-xl bg-foreground/5 grid place-items-center">
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 49 }).map((_, i) => (
                      <span key={i} className={"h-2.5 w-2.5 " + (Math.random() > 0.5 ? "bg-foreground" : "bg-transparent")} />
                    ))}
                  </div>
                </div>
                <button className="mt-4 w-full rounded-lg py-2.5 text-sm border border-border hover:bg-surface-container flex items-center justify-center gap-2"><Check className="h-4 w-4" />Pix copia e cola</button>
              </div>
              <div className="rounded-xl glass p-5 space-y-3 text-sm">
                <div className="font-semibold">Opção 2: Transferência Internacional</div>
                <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Banco parceiro</div><div>Standard Chartered (Global)</div></div>
                <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">SWIFT / BIC</div><div className="font-mono">TXLPBRSPXXX</div></div>
                <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Conta operacional</div><div className="font-mono">8829-00129-2192-0</div></div>
                <div className="p-3 rounded-lg bg-surface-container-low text-xs text-muted-foreground">Tempo estimado: 12-24h úteis para conciliação bancária.</div>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/30 text-sm flex items-start gap-3">
              <Lock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>O valor será mantido vinculado à operação até confirmação do evento aduaneiro.</span>
            </div>
          </div>

          {/* Status flow */}
          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-7"><ArrowLeftRight className="h-4 w-4 text-secondary" />Status do Fluxo Operacional</h2>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase tracking-widest">
              {[
                { l: "Aguardando Garantia", i: Smile, active: true },
                { l: "Garantia Confirmada", i: CreditCard },
                { l: "Monitoramento Ativo", i: ShieldCheck },
                { l: "Pagamento Liberado", i: Check },
              ].map((s, i, arr) => (
                <div key={s.l} className="relative">
                  <div className={"mx-auto h-12 w-12 rounded-full grid place-items-center " + (s.active ? "bg-secondary text-secondary-foreground shadow-[0_0_20px_oklch(0.85_0.18_200/0.5)]" : "bg-surface-container border border-border text-muted-foreground")}>
                    <s.i className="h-5 w-5" />
                  </div>
                  <div className={"mt-3 " + (s.active ? "text-secondary" : "text-muted-foreground")}>{s.l}</div>
                  {i < arr.length - 1 && <div className="absolute top-6 left-[60%] right-[-40%] h-px bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-surface p-6 ring-1 ring-secondary/40">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2"><CreditCard className="h-4 w-4 text-secondary" />Liberação de Pagamento</h3>
              <span className="chip chip-warning text-[10px]">Aguardando Garantia</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">O monitoramento operacional será iniciado após confirmação da garantia operacional da operação.</p>
            <div className="mt-5 space-y-3 text-sm p-4 rounded-xl glass">
              <Row label="Plano operacional" value="Standard Enterprise" />
              <Row label="Taxa de liquidação" value="0,8% (USD)" valueClass="text-secondary font-semibold" />
            </div>
            <div className="text-[10px] text-muted-foreground italic mt-2">Fee calculado sobre o valor total da invoice comercial.</div>
            <div className="mt-4 p-4 rounded-xl glass flex gap-3 items-start text-xs"><Lock className="h-4 w-4 text-secondary mt-0.5" /> Garantia operacional em custódia digital vinculada.</div>
          </div>

          <div className="card-surface p-6 opacity-80">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center gap-2"><EyeOff className="h-4 w-4 text-muted-foreground" />Monitoramento pendente</h3>
              <span className="chip text-[10px]">Offline</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">O acompanhamento aduaneiro será iniciado automaticamente após ativação financeira.</p>
            <div className="mt-4 text-[11px] font-mono text-muted-foreground inline-flex items-center gap-2"><Clock className="h-3 w-3" />Aguardando conexão Siscomex API…</div>
          </div>

          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Financeira</h3>
            <div className="space-y-3 text-sm">
              <Row label="Carta de Crédito Tradicional" value="≈ USD 3.560" valueClass="text-destructive" />
              <Row label="TXLOGPAY Standard" value="≈ USD 1.140" valueClass="text-secondary" />
              <div className="pt-3 border-t border-border flex justify-between"><span className="font-semibold">Economia estimada</span><span className="text-2xl font-bold text-gradient">USD 2.420</span></div>
            </div>
          </div>

          <button className="btn-primary w-full rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" /> Confirmar Garantia Operacional
          </button>
          <p className="text-[11px] text-center text-muted-foreground">Ao confirmar, você declara estar ciente dos termos de garantia de pagamento e garantia operacional da plataforma.</p>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</div>
      <div className={"w-full bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm " + (highlight ? "text-secondary font-bold text-lg" : "")}>{value}</div>
    </div>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className={valueClass}>{value}</span></div>
  );
}
