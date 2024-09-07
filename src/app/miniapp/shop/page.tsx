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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Power Play Shop</h1>

      <Tabs defaultValue="equipment" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger
            value="equipment"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Equipment
          </TabsTrigger>
          <TabsTrigger
            value="powerups"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Power-ups
          </TabsTrigger>
          <TabsTrigger
            value="cosmetics"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
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
