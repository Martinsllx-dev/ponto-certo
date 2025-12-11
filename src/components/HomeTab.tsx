import { useState, useEffect } from "react";
import { Search, Navigation, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { BusCard } from "./BusCard";
import { NearbyStop } from "./NearbyStop";

const mockBuses = [
  {
    lineNumber: "2012",
    lineName: "Terminal Bandeira",
    arrivalTime: 2,
    destination: "Pq. Dom Pedro II",
    distance: "150m",
    isAccessible: true,
  },
  {
    lineNumber: "875A",
    lineName: "Metrô Tucuruvi",
    arrivalTime: 5,
    destination: "Terminal Santana",
    distance: "150m",
    isAccessible: true,
  },
  {
    lineNumber: "1780",
    lineName: "Lapa - Brás",
    arrivalTime: 8,
    destination: "Estação Brás",
    distance: "150m",
    isAccessible: false,
  },
];

const mockStops = [
  {
    name: "Av. Paulista, 1578",
    distance: "150m do seu local",
    lines: ["2012", "875A", "1780", "917H"],
  },
  {
    name: "R. Augusta, 2023",
    distance: "320m do seu local",
    lines: ["875A", "6291", "908T"],
  },
  {
    name: "R. Consolação, 1200",
    distance: "450m do seu local",
    lines: ["2012", "177H", "875A"],
  },
];

export const HomeTab = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [buses, setBuses] = useState(mockBuses);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate updated arrival times
    setBuses(prev => prev.map(bus => ({
      ...bus,
      arrivalTime: Math.max(1, bus.arrivalTime - Math.floor(Math.random() * 2)),
    })));
    
    setIsRefreshing(false);
  };

  // Auto-refresh every 30 seconds
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
              <p className="text-xs text-muted-foreground">Av. Paulista, próx. ao MASP</p>
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
