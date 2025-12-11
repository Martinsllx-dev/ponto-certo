import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { HomeTab } from "@/components/HomeTab";
import { CardTab } from "@/components/CardTab";
import { StopsTab } from "@/components/StopsTab";
import { ProfileTab } from "@/components/ProfileTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "card":
        return <CardTab />;
      case "stops":
        return <StopsTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 max-w-md mx-auto">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
