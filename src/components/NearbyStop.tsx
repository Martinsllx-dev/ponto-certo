import { MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/button";

interface NearbyStopProps {
  name: string;
  distance: string;
  lines: string[];
  onSelect: () => void;
}

export const NearbyStop = ({ name, distance, lines, onSelect }: NearbyStopProps) => {
  return (
    <button
      onClick={onSelect}
      className="w-full bg-card rounded-2xl p-4 transit-shadow border border-border/30 text-left hover:shadow-[var(--shadow-elevated)] transition-all duration-300 animate-slide-up"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{distance}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {lines.map((line) => (
                <span
                  key={line}
                  className="px-2 py-0.5 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-8 h-8 rounded-lg bg-transit-blue/10 flex items-center justify-center">
          <Navigation className="w-4 h-4 text-transit-blue" />
        </div>
      </div>
    </button>
  );
};
