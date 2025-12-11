import { useState, useEffect } from "react";
import { Search, Navigation, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { BusCard } from "./BusCard";
import { NearbyStop } from "./NearbyStop";

// Linhas de ônibus reais de Contagem
const mockBuses = [
  {
    lineNumber: "5201",
    lineName: "Shopping Contagem",
    arrivalTime: 3,
    destination: "Terminal Eldorado",
    distance: "120m",
    isAccessible: true,
  },
  {
    lineNumber: "5103",
    lineName: "Eldorado - Centro",
    arrivalTime: 5,
    destination: "Centro de Contagem",
    distance: "120m",
    isAccessible: true,
  },
  {
    lineNumber: "5505",
    lineName: "Ressaca - Industrial",
    arrivalTime: 8,
    destination: "Cidade Industrial",
    distance: "120m",
    isAccessible: false,
  },
  {
    lineNumber: "5302",
    lineName: "Petrolândia",
    arrivalTime: 12,
    destination: "Terminal Petrolândia",
    distance: "120m",
    isAccessible: true,
  },
];

const mockStops = [
  {
    name: "Av. João César de Oliveira, 1200",
    distance: "120m do seu local",
    lines: ["5201", "5103", "5505", "5302"],
  },
  {
    name: "Terminal Eldorado",
    distance: "450m do seu local",
    lines: ["5201", "5103", "5401", "5602"],
  },
  {
    name: "Shopping Contagem",
    distance: "800m do seu local",
    lines: ["5201", "5302", "5505"],
  },
];

export const HomeTab = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [buses, setBuses] = useState(mockBuses);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBuses(prev => prev.map(bus => ({
      ...bus,
      arrivalTime: Math.max(1, bus.arrivalTime - Math.floor(Math.random() * 2)),
    })));
    
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        arrivalTime: Math.max(1, bus.arrivalTime - 1),
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar linha ou destino..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border/50 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors transit-shadow"
        />
      </div>
      
      {/* Current Location */}
      <div className="bg-card rounded-2xl p-4 transit-shadow border border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-transit-green/10 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-transit-green" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Localização atual</p>
              <p className="text-xs text-muted-foreground">Eldorado, Contagem - MG</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon-sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      {/* Próximos ônibus */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Próximos ônibus</h2>
          <span className="text-xs text-muted-foreground">Atualizado agora</span>
        </div>
        <div className="space-y-3">
          {buses.map((bus, index) => (
            <BusCard key={index} {...bus} />
          ))}
        </div>
      </section>
      
      {/* Paradas próximas */}
      <section>
        <h2 className="font-bold text-foreground mb-3">Paradas próximas</h2>
        <div className="space-y-3">
          {mockStops.map((stop, index) => (
            <NearbyStop
              key={index}
              {...stop}
              onSelect={() => console.log("Selected stop:", stop.name)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
