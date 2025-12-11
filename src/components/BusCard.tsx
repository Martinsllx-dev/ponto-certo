import { Bus, Clock, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusCardProps {
  lineNumber: string;
  lineName: string;
  arrivalTime: number;
  destination: string;
  distance: string;
  isAccessible?: boolean;
}

export const BusCard = ({
  lineNumber,
  lineName,
  arrivalTime,
  destination,
  distance,
  isAccessible = true,
}: BusCardProps) => {
  const getTimeColor = (minutes: number) => {
    if (minutes <= 3) return "text-transit-green bg-transit-green/10";
    if (minutes <= 7) return "text-transit-orange bg-transit-orange/10";
    return "text-transit-blue bg-transit-blue/10";
  };

  const getTimeLabel = (minutes: number) => {
    if (minutes <= 1) return "Chegando";
    return `${minutes} min`;
  };

  return (
    <div className="bg-card rounded-2xl p-4 transit-shadow border border-border/30 animate-slide-up hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl transit-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">{lineNumber}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{lineName}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowRight className="w-3 h-3" />
              <span>{destination}</span>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "px-3 py-1.5 rounded-full font-semibold text-sm",
          getTimeColor(arrivalTime)
        )}>
          {getTimeLabel(arrivalTime)}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Próximo: 12 min</span>
          </div>
        </div>
        
        {isAccessible && (
          <div className="w-6 h-6 rounded-full bg-transit-blue/10 flex items-center justify-center">
            <span className="text-xs">♿</span>
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-3 relative">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full transit-gradient rounded-full transition-all duration-1000"
            style={{ width: `${Math.max(10, 100 - arrivalTime * 8)}%` }}
          />
        </div>
        <Bus className="absolute -top-1.5 text-primary w-4 h-4" style={{ left: `${Math.max(5, 100 - arrivalTime * 8 - 2)}%` }} />
      </div>
    </div>
  );
};
