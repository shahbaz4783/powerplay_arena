import { Card, CardContent } from "@/src/components/ui/card";
import { BarChart2, ShoppingBag, Trophy, Users } from "lucide-react";

export function NavCards() {
  return (
    <section className="grid grid-cols-3 gap-4">
      <Card className=" shadow-md">
        <CardContent className="p-4 flex flex-col items-center">
          <Users className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-sm">Leaderboard</span>
        </CardContent>
      </Card>
      <Card className=" shadow-md">
        <CardContent className="p-4 flex flex-col items-center">
          <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-sm">Stats</span>
        </CardContent>
      </Card>
      <Card className=" shadow-md">
        <CardContent className="p-4 flex flex-col items-center">
          <ShoppingBag className="h-8 w-8 text-purple-500 mb-2" />
          <span className="text-sm">Shop</span>
        </CardContent>
      </Card>
    </section>
  );
}
