import { Search, MapPin, Star, Clock } from "lucide-react";
import { NearbyStop } from "./NearbyStop";
import { Button } from "./ui/button";

const favoriteStops = [
  {
    name: "Av. Paulista, 1578",
    distance: "150m",
    lines: ["2012", "875A", "1780"],
  },
  {
    name: "Terminal Bandeira",
    distance: "2.3km",
    lines: ["2012", "177H", "6291"],
  },
];

const allStops = [
  {
    name: "R. Augusta, 2023",
    distance: "320m",
    lines: ["875A", "6291", "908T"],
  },
  {
    name: "R. Consolação, 1200",
    distance: "450m",
    lines: ["2012", "177H", "875A"],
  },
  {
    name: "Praça da República",
    distance: "1.2km",
    lines: ["917H", "875A", "2012", "108T"],
  },
  {
    name: "Metrô Consolação",
    distance: "600m",
    lines: ["875A", "908T"],
  },
];

export const StopsTab = () => {
  return (
    <div className="pb-24 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar parada..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border/50 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors transit-shadow"
        />
      </div>
      
      {/* Map Preview */}
      <div className="relative h-40 rounded-2xl overflow-hidden transit-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Ver mapa completo</p>
          </div>
        </div>
        {/* Simulated map markers */}
        <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-primary animate-pulse" />
        <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-secondary animate-pulse" />
        <div className="absolute bottom-12 left-24 w-3 h-3 rounded-full bg-primary animate-pulse" />
        <div className="absolute top-20 left-1/2 w-4 h-4 rounded-full bg-transit-green border-2 border-card" />
      </div>
      
      {/* Favorites */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-transit-orange fill-transit-orange" />
          <h2 className="font-bold text-foreground">Paradas favoritas</h2>
        </div>
        <div className="space-y-3">
          {favoriteStops.map((stop, index) => (
            <NearbyStop
              key={index}
              {...stop}
              onSelect={() => console.log("Selected:", stop.name)}
            />
          ))}
        </div>
      </section>
      
      {/* Recent */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-bold text-foreground">Paradas próximas</h2>
        </div>
        <div className="space-y-3">
          {allStops.map((stop, index) => (
            <NearbyStop
              key={index}
              {...stop}
              onSelect={() => console.log("Selected:", stop.name)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
