import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Shield, Zap } from "lucide-react";
import { Header } from "@/src/components/shared/header";

export default function ShopPage() {
  const items = [
    {
      name: "Power Bat",
      description: "Increases hitting power by 10%",
      price: 1000,
      icon: <Shield className="w-8 h-8 text-green-500" />,
    },
    {
      name: "Spin Master",
      description: "Improves spin bowling accuracy",
      price: 800,
      icon: <Shield className="w-8 h-8 text-green-500" />,
    },
    {
      name: "Fielding Gloves",
      description: "Enhances catching ability",
      price: 500,
      icon: <Shield className="w-8 h-8 text-green-500" />,
    },
    {
      name: "Energy Drink",
      description: "Restores stamina during matches",
      price: 200,
      icon: <Zap className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen space-y-6 text-gray-100 relative overflow-hidden">
      <Header
        title="Cricket Emporium"
        subtitle="Upgrade your gear and customize your experience"
      />

      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto">
          <TabsTrigger
            value="equipment"
            className="flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900"
          >
            Equipment
          </TabsTrigger>
          <TabsTrigger
            value="powerups"
            className="flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900"
          >
            Power-ups
          </TabsTrigger>
          <TabsTrigger
            value="cosmetics"
            className="flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900"
          >
            Cosmetics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipment">
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {item.name}
                  </CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-semibold">
                      {item.price} PWR
                    </span>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="powerups">
          <div className="text-center text-gray-400">
            <p>Power-ups coming soon!</p>
          </div>
        </TabsContent>

        <TabsContent value="cosmetics">
          <div className="text-center text-gray-400">
            <p>Cosmetic items coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
