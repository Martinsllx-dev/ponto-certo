import { useState } from "react";
import { TransportCard } from "./TransportCard";
import { RechargeModal } from "./RechargeModal";
import { TrendingUp, TrendingDown, Bus } from "lucide-react";

const recentTransactions = [
  { id: 1, type: "trip", description: "Linha 2012 - Terminal Bandeira", amount: -4.40, date: "Hoje, 08:32" },
  { id: 2, type: "trip", description: "Linha 875A - Metrô Tucuruvi", amount: -4.40, date: "Hoje, 07:15" },
  { id: 3, type: "recharge", description: "Recarga PIX", amount: 50.00, date: "Ontem, 19:45" },
  { id: 4, type: "trip", description: "Linha 1780 - Lapa - Brás", amount: -4.40, date: "Ontem, 18:20" },
  { id: 5, type: "trip", description: "Linha 2012 - Terminal Bandeira", amount: -4.40, date: "Ontem, 08:10" },
];

export const CardTab = () => {
  const [balance, setBalance] = useState(32.50);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);

  const handleRechargeSuccess = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return (
    <div className="pb-24 space-y-6">
      <TransportCard
        balance={balance}
        cardNumber="5234567890123456"
        cardName="João Silva"
        onRecharge={() => setIsRechargeOpen(true)}
      />
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 transit-shadow border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-transit-green/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-transit-green" />
            </div>
            <span className="text-xs text-muted-foreground">Este mês</span>
          </div>
          <p className="text-lg font-bold text-foreground">R$ 150,00</p>
          <p className="text-xs text-muted-foreground">em recargas</p>
        </div>
        
        <div className="bg-card rounded-xl p-4 transit-shadow border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-transit-orange/10 flex items-center justify-center">
              <Bus className="w-4 h-4 text-transit-orange" />
            </div>
            <span className="text-xs text-muted-foreground">Este mês</span>
          </div>
          <p className="text-lg font-bold text-foreground">28</p>
          <p className="text-xs text-muted-foreground">viagens</p>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <section>
        <h2 className="font-bold text-foreground mb-3">Histórico recente</h2>
        <div className="bg-card rounded-2xl transit-shadow border border-border/30 divide-y divide-border/50">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === "recharge" 
                    ? "bg-transit-green/10" 
                    : "bg-muted"
                }`}>
                  {transaction.type === "recharge" ? (
                    <TrendingUp className="w-5 h-5 text-transit-green" />
                  ) : (
                    <Bus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.amount > 0 ? "text-transit-green" : "text-foreground"
              }`}>
                {transaction.amount > 0 ? "+" : ""}
                R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
        </div>
      </section>
      
      <RechargeModal
        isOpen={isRechargeOpen}
        onClose={() => setIsRechargeOpen(false)}
        onSuccess={handleRechargeSuccess}
      />
    </div>
  );
};
