"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { Trophy, Zap, Clock, Award } from "lucide-react";

const tournaments = [
  {
    id: 1,
    name: "Blitz Bonanza",
    format: "Blitz Cricket",
    matches: 5,
    progress: 2,
  },
  {
    id: 2,
    name: "Power Play Challenge",
    format: "Power Play Pro",
    matches: 7,
    progress: 0,
  },
  {
    id: 3,
    name: "Classic Cup",
    format: "Cricket Classic",
    matches: 10,
    progress: 8,
  },
];

export default function TournamentPage() {
  const [selectedTournament, setSelectedTournament] = useState<number | null>(
    null,
  );

  const handleTournamentSelect = (id: number) => {
    setSelectedTournament(id);
  };

  const handleStartTournament = () => {
    // Logic to start the selected tournament
    console.log(`Starting tournament ${selectedTournament}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <motion.div
            key={tournament.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer ${selectedTournament === tournament.id ? "border-4 border-blue-500" : ""}`}
              onClick={() => handleTournamentSelect(tournament.id)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {tournament.name}
                  <TournamentIcon format={tournament.format} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  {tournament.format}
                </p>
                <p className="mb-2">{tournament.matches} Matches</p>
                <div className="flex items-center">
                  <Progress
                    value={(tournament.progress / tournament.matches) * 100}
                    className="flex-grow mr-2"
                  />
                  <span className="text-sm">
                    {tournament.progress}/{tournament.matches}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button
          onClick={handleStartTournament}
          disabled={selectedTournament === null}
          className="px-6 py-3 text-lg"
        >
          {selectedTournament === null
            ? "Select a Tournament"
            : "Start Tournament"}
        </Button>
      </div>
    </div>
  );
}

function TournamentIcon({ format }: { format: string }) {
  switch (format) {
    case "Blitz Cricket":
      return <Zap className="h-6 w-6 text-yellow-500" />;
    case "Power Play Pro":
      return <Clock className="h-6 w-6 text-green-500" />;
    case "Cricket Classic":
      return <Trophy className="h-6 w-6 text-purple-500" />;
    default:
      return <Award className="h-6 w-6 text-blue-500" />;
  }
}
