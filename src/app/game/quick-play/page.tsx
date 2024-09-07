"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { Trophy, Users, Zap, DollarSign } from "lucide-react";
import Link from "next/link";

export default function QuickMatchScreen() {
  const [entryFee, setEntryFee] = useState(10);

  const entryOptions = [
    { fee: 10, prize: 18 },
    { fee: 50, prize: 90 },
    { fee: 100, prize: 180 },
  ];

  return (
    <div className="min-h-screen text-gray-100 p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Quick Match</h1>

      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Match Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Select Entry Fee & Prize
            </h3>
            <RadioGroup
              onValueChange={(value) => setEntryFee(Number(value))}
              defaultValue={entryFee.toString()}
            >
              {entryOptions.map((option) => (
                <div
                  key={option.fee}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem
                    value={option.fee.toString()}
                    id={`fee-${option.fee}`}
                  />
                  <Label
                    htmlFor={`fee-${option.fee}`}
                    className="flex-1 flex justify-between"
                  >
                    <span>{option.fee} PWR Entry</span>
                    <span className="text-yellow-500">
                      {option.prize} PWR Prize
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Match Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Prize Pool
            </span>
            <span className="text-yellow-500 font-bold">
              {entryOptions.find((option) => option.fee === entryFee)?.prize}{" "}
              PWR
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Opponent
            </span>
            <span>Computer AI</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              Match Duration
            </span>
            <span>5 overs</span>
          </div>
        </CardContent>
      </Card>

      <Link href={"/game"}>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3">
          <DollarSign className="w-5 h-5 mr-2" />
          Pay {entryFee} PWR & Start Match
        </Button>
      </Link>
    </div>
  );
}
