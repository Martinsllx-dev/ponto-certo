import { useState } from "react";
import { CreditCard, Plus, History, QrCode, Wifi } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TransportCardProps {
  balance: number;
  cardNumber: string;
  cardName: string;
  onRecharge: () => void;
}

export const TransportCard = ({ balance, cardNumber, cardName, onRecharge }: TransportCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Card Visual */}
      <div 
        className="relative w-full aspect-[1.6/1] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(
          "absolute inset-0 transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}>
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full rounded-2xl transit-gradient p-5 flex flex-col justify-between shadow-[var(--shadow-elevated)] overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/20 -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-foreground/20 translate-y-1/2 -translate-x-1/4" />
              </div>
              
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-xs font-medium">Cartão de Transporte</p>
                  <h2 className="text-primary-foreground font-bold text-xl mt-1">BusTrack</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-primary-foreground/80" />
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">NFC</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <p className="text-primary-foreground/70 text-xs mb-1">Saldo disponível</p>
                <p className="text-primary-foreground text-3xl font-bold">
                  R$ {balance.toFixed(2).replace('.', ',')}
                </p>
              </div>
              
              <div className="relative flex items-end justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-xs">Número do cartão</p>
                  <p className="text-primary-foreground font-mono text-sm tracking-wider">
                    •••• •••• •••• {cardNumber.slice(-4)}
                  </p>
                </div>
                <p className="text-primary-foreground/80 text-xs font-medium uppercase">{cardName}</p>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="w-full h-full rounded-2xl bg-foreground p-5 flex flex-col shadow-[var(--shadow-elevated)]">
              <div className="w-full h-10 bg-muted-foreground/30 -mx-5 mt-2" />
              <div className="flex-1 flex items-center justify-center">
                <div className="w-32 h-32 bg-card rounded-xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-foreground" />
                </div>
              </div>
              <p className="text-center text-muted text-xs">Toque para voltar</p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-muted-foreground">Toque no cartão para ver o QR Code</p>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="transit" className="h-14" onClick={onRecharge}>
          <Plus className="w-5 h-5" />
          Recarregar
        </Button>
        <Button variant="card" className="h-14">
          <History className="w-5 h-5" />
          Histórico
        </Button>
      </div>
    </div>
  );
};
