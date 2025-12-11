import { useState } from "react";
import { MapPin, Navigation, Bus, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { Button } from "./ui/button";

const busStops = [
  { id: 1, name: "Terminal Eldorado", x: 45, y: 30, lines: ["5201", "5103"] },
  { id: 2, name: "Shopping Contagem", x: 65, y: 45, lines: ["5201", "5302"] },
  { id: 3, name: "Av. João César", x: 35, y: 55, lines: ["5505", "5103"] },
  { id: 4, name: "Centro Contagem", x: 55, y: 70, lines: ["5103", "5302"] },
  { id: 5, name: "Cidade Industrial", x: 75, y: 25, lines: ["5505", "5401"] },
  { id: 6, name: "Petrolândia", x: 25, y: 40, lines: ["5302", "5602"] },
];

const activeBuses = [
  { id: 1, line: "5201", x: 50, y: 38, direction: "Terminal" },
  { id: 2, line: "5103", x: 40, y: 50, direction: "Centro" },
  { id: 3, line: "5505", x: 60, y: 35, direction: "Industrial" },
];

export const MapTab = () => {
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const selectedStopData = busStops.find(s => s.id === selectedStop);

  return (
    <div className="pb-24 space-y-4">
      {/* Map Container */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden transit-shadow border border-border/30 bg-gradient-to-br from-primary/5 to-secondary/5">
        {/* Simulated Map Background */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Grid lines to simulate streets */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Main roads */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.3"/>
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.3"/>
            <line x1="30%" y1="50%" x2="70%" y2="70%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.2"/>
          </svg>

          {/* Bus Stops */}
          {busStops.map((stop) => (
            <button
              key={stop.id}
              onClick={() => setSelectedStop(stop.id === selectedStop ? null : stop.id)}
              className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedStop === stop.id
                  ? "bg-primary scale-125 shadow-lg"
                  : "bg-card border-2 border-primary hover:scale-110"
              }`}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            >
              <MapPin className={`w-4 h-4 ${selectedStop === stop.id ? "text-primary-foreground" : "text-primary"}`} />
            </button>
          ))}

          {/* Active Buses */}
          {activeBuses.map((bus) => (
            <div
              key={bus.id}
              className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-transit-green flex items-center justify-center animate-pulse shadow-lg"
              style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
            >
              <Bus className="w-4 h-4 text-secondary-foreground" />
            </div>
          ))}

          {/* User Location */}
          <div 
            className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transit-blue border-3 border-card shadow-lg"
            style={{ left: "40%", top: "52%" }}
          >
            <div className="absolute inset-0 rounded-full bg-transit-blue/30 animate-ping" />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button 
            variant="card" 
            size="icon-sm"
            onClick={() => setZoom(z => Math.min(z + 0.2, 1.5))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button 
            variant="card" 
            size="icon-sm"
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.8))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="card" size="icon-sm">
            <Locate className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute left-3 bottom-3 bg-card/90 backdrop-blur-sm rounded-xl p-3 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-transit-blue" />
            <span className="text-foreground">Você está aqui</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <MapPin className="w-2 h-2 text-primary" />
            </div>
            <span className="text-foreground">Paradas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg bg-transit-green flex items-center justify-center">
              <Bus className="w-2 h-2 text-secondary-foreground" />
            </div>
            <span className="text-foreground">Ônibus</span>
          </div>
        </div>
      </div>

      {/* Selected Stop Info */}
      {selectedStopData && (
        <div className="bg-card rounded-2xl p-4 transit-shadow border border-border/30 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{selectedStopData.name}</h3>
                <p className="text-xs text-muted-foreground">Contagem - MG</p>
              </div>
            </div>
            <Button variant="transit" size="sm">
              <Navigation className="w-4 h-4" />
              Ir
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedStopData.lines.map((line) => (
              <span
                key={line}
                className="px-3 py-1 bg-primary/10 rounded-lg text-sm font-medium text-primary"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Info */}
      <div className="bg-card rounded-2xl p-4 transit-shadow border border-border/30">
        <h3 className="font-semibold text-foreground mb-3">Região: Eldorado - Contagem</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-xl font-bold text-primary">{busStops.length}</p>
            <p className="text-xs text-muted-foreground">Paradas</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-xl font-bold text-transit-green">{activeBuses.length}</p>
            <p className="text-xs text-muted-foreground">Ônibus ativos</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-xl font-bold text-transit-orange">8</p>
            <p className="text-xs text-muted-foreground">Linhas</p>
          </div>
        </div>
      </div>
    </div>
  );
};
