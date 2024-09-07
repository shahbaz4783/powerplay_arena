"use client";

import { useState } from "react";
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
import { Trophy, Users, Calendar, DollarSign, Star } from "lucide-react";

export default function TournamentScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tournaments = [
    {
      name: "Power Play Cup",
      teams: [
        "Thunderbolts",
        "Royal Strikers",
        "Golden Eagles",
        "Mighty Titans",
        "Silver Wolves",
        "Crimson Dragons",
        "Emerald Knights",
        "Shadow Assassins",
      ],
      duration: "3 days",
      entryFee: 500,
      prize: 5000,
      matches: [
        {
          round: "Quarter Finals",
          teams: [
            "Thunderbolts vs Royal Strikers",
            "Golden Eagles vs Mighty Titans",
            "Silver Wolves vs Crimson Dragons",
            "Emerald Knights vs Shadow Assassins",
          ],
        },
        { round: "Semi Finals", teams: ["TBD vs TBD", "TBD vs TBD"] },
        { round: "Final", teams: ["TBD vs TBD"] },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-gray-100 p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Tournaments</h1>

      <Tabs defaultValue="upcoming" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger
            value="upcoming"
            onClick={() => setActiveTab("upcoming")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            onClick={() => setActiveTab("ongoing")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => setActiveTab("completed")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {tournaments.map((tournament, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 mb-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  {tournament.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <span>{tournament.teams.length} teams</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-500" />
                    <span>{tournament.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{tournament.entryFee} PWR entry</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <span>{tournament.prize} PWR prize</span>
                  </div>
                </div>

                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  Join Tournament
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="text-center text-gray-400">
            <p>No ongoing tournaments at the moment.</p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center text-gray-400">
            <p>No completed tournaments yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
