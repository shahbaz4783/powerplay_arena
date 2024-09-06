import UserInfo from "./userInfo";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { BarChart2, ShoppingBag, Trophy, Users } from "lucide-react";
import { fakeDelay } from "@/src/lib/utils";

const MiniAppHomePage = async () => {
  await fakeDelay(5000);
  return (
    <div className="space-y-5 min-h-[84svh] flex flex-col justify-between">
      <UserInfo />

      <section className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-blue-700 border-blue-600">
          <CardContent className="p-4 flex flex-col items-center">
            <Trophy className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-bold mb-2">Quick Match</h3>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Hit the Pitch
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-purple-700 border-purple-600">
          <CardContent className="p-4 flex flex-col items-center">
            <Trophy className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-bold mb-2">Tournament</h3>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              Join the League
            </Button>
          </CardContent>
        </Card>
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

      <div className="w-full max-w-md bg-green-800 rounded-lg p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold mb-2 text-center">
          Today's Power Play
        </h3>
        <p className="text-sm text-center mb-4">
          Score big with your daily bonus!
        </p>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold py-3 rounded-full transform hover:scale-105 transition-transform duration-300">
          Claim Your Power-Up
        </Button>
      </div>
    </div>
  );
};

export default MiniAppHomePage;
