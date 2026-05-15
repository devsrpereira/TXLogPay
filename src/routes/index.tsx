import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight, FileText, Lock, Radar, Zap, Shield, Mail, Share2,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TXLOGPAY — Pagamentos liberados após aprovação alfandegária" },
      { name: "description", content: "Deposite uma única vez. O TXLOGPAY protege o pagamento e libera automaticamente quando a carga é aprovada pela Receita Federal." },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { tag: "PASSO 01", icon: FileText, title: "Documentos enviados", desc: "Fatura comercial e Packing List processados via OCR inteligente.", chip: "Concluído", chipClass: "chip-success" },
  { tag: "PASSO 02", icon: Lock, title: "Pagamento protegido", desc: "Fundos mantidos em custódia segura vinculada ao BL da carga.", chip: "Cargo Protection Ativo", chipClass: "chip-cargo" },
  { tag: "PASSO 03", icon: Radar, title: "Análise alfandegária", desc: "Monitoramento em tempo real dos canais de parametrização.", chip: "Em andamento", chipClass: "chip-info" },
  { tag: "FINAL", icon: Zap, title: "Liberação Instantânea", desc: "Carga aprovada. Pagamento liberado em menos de 10 segundos.", chip: "Sucesso Automático", chipClass: "chip-cargo" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-8" />
            <span className="text-secondary font-mono text-xs uppercase tracking-widest">Platform</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#logistics" className="hover:text-foreground">Logistics</a>
            <a href="#payments" className="hover:text-foreground">Payments</a>
            <a href="#security" className="hover:text-foreground">Security</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm hover:text-secondary">Entrar</Link>
            <Link to="/dashboard" className="btn-primary rounded-full px-5 py-2 text-sm font-semibold">Começar</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Logo className="h-20 mx-auto mb-10" />
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-gradient">
            Pagamentos internacionais<br />liberados automaticamente<br />após aprovação da alfândega.
          </h1>
          <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Deposite uma única vez. O TXLOGPAY protege o pagamento e libera automaticamente
            quando a carga for aprovada. Tecnologia financeira para o futuro do comércio exterior.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/operacoes/conectar" className="btn-primary rounded-xl px-7 py-3.5 font-semibold inline-flex items-center gap-2">
              Criar Operação <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="rounded-xl px-7 py-3.5 font-semibold border border-border hover:bg-surface-container transition">
              Ver Demonstração
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={"card-surface card-surface-hover p-6 relative " + (i === 3 ? "bg-gradient-to-br from-[oklch(0.30_0.10_265)] to-[oklch(0.28_0.14_320)]" : "")}
            >
              <span className="chip chip-info text-[10px]">{s.tag}</span>
              <s.icon className="h-7 w-7 mt-5 text-secondary" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-5">
                <span className={"chip " + s.chipClass}>{s.chip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compatible logos */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Compatível com fluxos globais de comércio exterior</h2>
        <p className="mt-3 text-sm text-muted-foreground">Construído para importadores, exportadores e despachantes aduaneiros de alta performance.</p>
        <div className="mt-10 grid grid-cols-3 md:grid-cols-7 gap-6 opacity-70">
          {["MAERSK", "MSC", "CMA", "HAPAG", "EVERGREEN", "COSCO", "ONE"].map(n => (
            <div key={n} className="h-14 rounded-lg glass grid place-items-center font-mono text-xs tracking-widest">{n}</div>
          ))}
        </div>
      </section>

      {/* Visibility section */}
      <section id="logistics" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="chip chip-info">Visibilidade Total</span>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">Gestão Aduaneira em Tempo Real</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Acompanhe cada etapa da sua operação internacional com dados precisos da Receita Federal e portos.
            Do desembaraço à liquidação financeira, tudo em um só lugar.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Timeline aduaneira automatizada", "Cards de pagamento protegido em custódia", "Confirmação de liberação em milissegundos"].map(t => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid place-items-center h-5 w-5 rounded-full" style={{ background: "var(--gradient-brand)" }}>
                  <Shield className="h-3 w-3 text-primary-foreground" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60"></span>
              <span className="h-3 w-3 rounded-full bg-warning/60"></span>
              <span className="h-3 w-3 rounded-full bg-success/60"></span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">PAINEL TXLOGPAY</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl p-4 glass">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest">NAVIO MSC ROSA</div>
              <div className="font-semibold mt-1">SFS001</div>
              <div className="flex justify-between text-xs mt-3 text-muted-foreground"><span>Partida 12/05</span><span>Chegada 28/05</span></div>
            </div>
            <div className="rounded-xl p-4 glass">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest">VALOR</div>
              <div className="font-semibold mt-1 text-gradient">USD 45.200,00</div>
              <span className="chip chip-cargo mt-2 text-[9px]">Protegido em custódia</span>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl glass space-y-3 text-sm">
            {[
              { t: "08:41 — DI registrada", s: "Receita Federal do Brasil", i: Shield, c: "text-secondary" },
              { t: "08:43 — Canal verde identificado", s: "Parametrização concluída", i: Shield, c: "text-success" },
              { t: "08:43 — Pagamento liberado automaticamente", s: "Liquidação instantânea via TXLOGPAY", i: Zap, c: "text-accent" },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <r.i className={"h-4 w-4 mt-0.5 " + r.c} />
                <div>
                  <div className="font-medium">{r.t}</div>
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{r.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <Logo className="h-7" />
            <p className="text-muted-foreground mt-3 text-xs">Infraestrutura financeira para o comércio exterior moderno.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Produto</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Platform</li><li>Payments</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Privacidade</li><li>Termos</li><li>Conformidade</li>
            </ul>
          </div>
          <div className="md:text-right text-muted-foreground text-xs flex md:justify-end items-end gap-3">
            <span>© 2024 TXLOGPAY Global Trade Systems.</span>
            <Share2 className="h-4 w-4" /><Mail className="h-4 w-4" />
          </div>
        </div>
      </footer>
    </div>
  );
}
