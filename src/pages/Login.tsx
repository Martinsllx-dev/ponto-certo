import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast({
        title: "Bem-vindo, Everton! 🎉",
        description: "Login realizado com sucesso",
      });
      navigate("/");
    } else {
      toast({
        title: "Erro",
        description: "Senha deve ter pelo menos 4 caracteres",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl transit-gradient mx-auto mb-4 flex items-center justify-center shadow-[var(--shadow-elevated)]">
          <Bus className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Aprimora Tech</h1>
        <p className="text-sm text-muted-foreground mt-1">Seu transporte inteligente</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 animate-slide-up">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border/50 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-12 pr-12 rounded-xl bg-card border border-border/50 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="transit"
          size="xl"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <button type="button" className="text-primary font-medium hover:underline">
            Cadastre-se
          </button>
        </p>
      </form>

      {/* Demo hint */}
      <p className="mt-8 text-xs text-muted-foreground text-center">
        Demo: use qualquer e-mail e senha (mín. 4 caracteres)
      </p>
    </div>
  );
};

export default Login;
