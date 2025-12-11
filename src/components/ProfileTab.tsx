import { User, Settings, HelpCircle, Shield, Bell, LogOut, ChevronRight, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const ProfileTab = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Até logo!",
      description: "Você saiu da sua conta",
    });
    navigate("/login");
  };

  const menuItems = [
    { icon: Bell, label: "Notificações", hasToggle: true, checked: true },
    { icon: Moon, label: "Modo escuro", hasToggle: true, checked: isDark, onToggle: toggleTheme },
    { icon: Shield, label: "Privacidade e segurança" },
    { icon: HelpCircle, label: "Ajuda e suporte" },
    { icon: Settings, label: "Configurações" },
  ];

  return (
    <div className="pb-24 space-y-6">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-6 transit-shadow border border-border/30 text-center">
        <div className="w-20 h-20 rounded-full transit-gradient mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{user?.name || "Everton"}</h2>
        <p className="text-sm text-muted-foreground">{user?.email || "everton@email.com"}</p>
        <p className="text-xs text-muted-foreground mt-1">Membro desde Janeiro 2024</p>
        
        <Button variant="outline" className="mt-4">
          Editar perfil
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-4 transit-shadow border border-border/30 text-center">
          <p className="text-2xl font-bold text-primary">156</p>
          <p className="text-xs text-muted-foreground">Viagens</p>
        </div>
        <div className="bg-card rounded-xl p-4 transit-shadow border border-border/30 text-center">
          <p className="text-2xl font-bold text-transit-green">R$ 687</p>
          <p className="text-xs text-muted-foreground">Economizado</p>
        </div>
        <div className="bg-card rounded-xl p-4 transit-shadow border border-border/30 text-center">
          <p className="text-2xl font-bold text-transit-orange">12</p>
          <p className="text-xs text-muted-foreground">Meses ativo</p>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="bg-card rounded-2xl transit-shadow border border-border/30 divide-y divide-border/50">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            onClick={item.onToggle}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">{item.label}</span>
            </div>
            {item.hasToggle ? (
              <Switch checked={item.checked} onCheckedChange={item.onToggle} />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>
      
      {/* Logout */}
      <Button 
        variant="outline" 
        className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sair da conta
      </Button>
      
      {/* App Info */}
      <p className="text-center text-xs text-muted-foreground">
        Aprimora Tech v1.0.0 • © 2024
      </p>
    </div>
  );
};
