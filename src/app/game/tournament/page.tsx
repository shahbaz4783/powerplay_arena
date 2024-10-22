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
import TournamentPage from "@/src/components/game-modes/tournament";
import { Header } from "@/src/components/shared/header";

export default function TournamentScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tournaments = [
    {
      name: "Classic Cup",
      description:
        "A traditional knockout tournament where players compete to be the last team standing.",
      structure: {
        rounds: ["Quarter-finals", "Semi-finals", "Finals"],
      },
      rewards:
        "Increasing rewards with each round, culminating in a grand prize for the winner",
    },
    {
      name: "Super Sixes Showdown",
      description:
        "A tournament focused on aggressive batting and high scores.",
      structure: {
        rounds: ["Group stage", "Knockout rounds"],
        specialRules: "Bonus points for hitting sixes",
      },
      rewards:
        "Special rewards for the highest number of sixes in addition to the tournament prize",
    },
    {
      name: "Wicket Warriors League",
      description:
        "A tournament emphasizing bowling skills and taking wickets.",
      structure: {
        rounds: ["Round-robin stage", "Knockout rounds"],
        specialRules: "Bonus points for taking wickets",
      },
      rewards:
        "Special rewards for the most wickets taken in addition to the tournament prize",
    },
    {
      name: "PowerPlay Championship",
      description:
        "A balanced tournament that tests both batting and bowling skills.",
      structure: {
        rounds:
          "Double elimination format, giving players a second chance if they lose a match",
        specialRules: "PowerPlay overs where runs and wickets count double",
      },
      rewards:
        "Enhanced rewards during PowerPlay overs and a grand prize for the winner",
    },
  ];

  return (
    <div className="min-h-screen space-y-6 text-gray-100 p-4 relative overflow-hidden">
      <Header
        title="Tournaments"
        subtitle="Compete in high-stakes events for glory and rewards"
      />

      <Tabs defaultValue="upcoming" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger
            value="series"
            onClick={() => setActiveTab("upcoming")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Series
          </TabsTrigger>
          <TabsTrigger
            value="leagues"
            onClick={() => setActiveTab("ongoing")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Leagues
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            onClick={() => setActiveTab("completed")}
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
          >
            Ongoing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="series">
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
                    <span>8 teams</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-500" />
                    <span>{5}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{456} PWR entry</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <span>{5675} PWR prize</span>
                  </div>
                </div>

                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  Join Tournament
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="leagues">
          <div className="text-center text-gray-400">
            <TournamentPage />
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="text-center text-gray-400">
            <p>There are no ongoing tournaments yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
