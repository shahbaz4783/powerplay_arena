import { Game } from "@/src/components/earn/game";
import UserInfo from "./userInfo";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { BarChart2, ShoppingBag, Trophy, Users } from "lucide-react";

const MiniAppHomePage = async () => {
  return (
    <div className="space-y-5">
      <UserInfo />

      <section className="grid grid-cols-2 gap-4">
        <Button className="h-24 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border border-blue-500">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">Quick Match</span>
          </div>
        </Button>
        <Button className="h-24 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 border border-purple-500">
          <div className="flex flex-col items-center">
            <Trophy className="h-8 w-8 mb-2" />
            <span className="text-sm font-semibold">Tournament</span>
          </div>
        </Button>
      </section>

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

      <Card className="bg-slate-800/50 backdrop-blur-md border border-gray-700">
        <CardContent className="p-4">
          <h2 className="font-bold text-lg mb-2 text-blue-400">Daily Claim</h2>
          <p className="text-sm text-gray-300 mb-4">Claim your daily reward!</p>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Claim Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniAppHomePage;
