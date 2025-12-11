import { useState } from "react";
import { X, CreditCard, Smartphone, Building, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

const quickAmounts = [10, 20, 30, 50, 100];

const paymentMethods = [
  { id: "pix", icon: Zap, label: "PIX", description: "Instantâneo" },
  { id: "credit", icon: CreditCard, label: "Cartão", description: "Crédito/Débito" },
  { id: "bank", icon: Building, label: "Boleto", description: "1-3 dias úteis" },
];

export const RechargeModal = ({ isOpen, onClose, onSuccess }: RechargeModalProps) => {
  const [amount, setAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = async () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    if (finalAmount < 5) {
      toast({
        title: "Valor mínimo",
        description: "O valor mínimo para recarga é R$ 5,00",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onSuccess(finalAmount);
    toast({
      title: "Recarga realizada! 🎉",
      description: `R$ ${finalAmount.toFixed(2).replace('.', ',')} adicionado ao seu cartão`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-card rounded-t-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recarregar Cartão</h2>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Quick Amounts */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Valores rápidos</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                  amount === value && !customAmount
                    ? "transit-gradient text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                R$ {value}
              </button>
            ))}
          </div>
        </div>
        
        {/* Custom Amount */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Ou digite um valor</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
            <input
              type="number"
              placeholder="0,00"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary outline-none text-lg font-semibold text-foreground transition-colors"
            />
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Forma de pagamento</p>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border-2",
                  paymentMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-muted hover:bg-muted/80"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  paymentMethod === method.id ? "transit-gradient" : "bg-background"
                )}>
                  <method.icon className={cn(
                    "w-5 h-5",
                    paymentMethod === method.id ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{method.label}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
                {paymentMethod === method.id && (
                  <div className="ml-auto w-5 h-5 rounded-full transit-gradient flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Total */}
        <div className="bg-muted rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total a pagar</span>
            <span className="text-2xl font-bold text-foreground">
              R$ {(customAmount ? parseFloat(customAmount) || 0 : amount).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
        
        {/* Confirm Button */}
        <Button 
          variant="transit" 
          size="xl" 
          className="w-full"
          onClick={handleRecharge}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="animate-pulse">Processando...</span>
          ) : (
            "Confirmar Recarga"
          )}
        </Button>
      </div>
    </div>
  );
};
