import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Box, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — TXLOGPAY" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: imersive */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
        style={{ background: "radial-gradient(circle at 30% 20%, oklch(0.32 0.18 265) 0%, oklch(0.18 0.10 270) 60%)" }}>
        <Logo className="h-12" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-bold leading-tight">
            Pagamentos<br />internacionais<br />protegidos por<br />eventos aduaneiros.
          </h1>
          <div className="mt-10">
            <span className="chip chip-cargo">Cargo-linked protection ativa</span>
          </div>
        </motion.div>
        <p className="text-xs text-muted-foreground">© 2024 TXLOGPAY Global Trade Systems. A tecnologia que move o comércio exterior.</p>
        {/* decorative blobs */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-accent)" }} />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-brand)" }} />
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md card-surface p-10">
          <div className="text-center">
            <Logo className="h-9 mx-auto" />
            <span className="chip chip-info mt-6">Ambiente Demonstrativo</span>
            <h2 className="mt-6 text-2xl font-semibold">Acesse sua conta</h2>
            <p className="text-sm text-muted-foreground mt-1">Insira suas credenciais corporativas para continuar.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@empresa.com.br"
                className="w-full bg-transparent border-b border-border focus:border-secondary outline-none py-2 mt-1 text-sm transition"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Senha</label>
                <a className="text-xs text-secondary hover:underline" href="#">Esqueceu a senha?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-border focus:border-secondary outline-none py-2 mt-1 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary w-full rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2">
              Entrar <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/dashboard" className="w-full rounded-xl py-3.5 font-medium flex items-center justify-center gap-2 border border-border hover:bg-surface-container transition">
              <Box className="h-4 w-4" /> Acessar ambiente demo
            </Link>
          </form>
          <div className="text-center mt-8 text-sm">
            Novo na TXLOGPAY? <a className="text-secondary font-semibold hover:underline">Solicite acesso</a>
          </div>
          <div className="text-center mt-4 text-[10px] font-mono text-muted-foreground tracking-widest flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" /> SECURE 256-BIT AES ENCRYPTION
          </div>
        </motion.div>
      </div>
    </div>
  );
}
