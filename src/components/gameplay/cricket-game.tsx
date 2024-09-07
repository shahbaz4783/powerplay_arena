"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Gameplay } from "./gameplay";
import { Result } from "./result";
import { Commentary } from "./commentary";
import { Toss } from "./toss";
import { GameState } from "@/src/lib/types";

export default function CricketGame() {
  const [gameState, setGameState] = useState<GameState>({
    gamePhase: "toss",
    tossWinner: null,
    tossChoice: null,
    currentInnings: 1,
    playerScore: 0,
    computerScore: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    target: null,
  });
  const [commentary, setCommentary] = useState<string[]>([]);

  const addCommentary = (text: string) => {
    setCommentary((prev) => [text, ...prev.slice(0, 2)]);
  };

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    const {
      overs,
      wickets,
      currentInnings,
      gamePhase,
      playerScore,
      computerScore,
    } = gameState;
    if (overs === 5 || wickets === 10) {
      if (currentInnings === 1) {
        updateGameState({
          currentInnings: 2,
          target: gamePhase === "batting" ? playerScore + 1 : computerScore + 1,
          overs: 0,
          balls: 0,
          wickets: 0,
          gamePhase: gamePhase === "batting" ? "bowling" : "batting",
        });
        addCommentary(
          `Innings over. Target: ${gamePhase === "batting" ? playerScore + 1 : computerScore + 1}`,
        );
      } else {
        updateGameState({ gamePhase: "result" });
      }
    }
  }, [gameState]);

  return (
    <div className="min-h-[100svh] bg-gray-900 text-gray-100 p-4 flex flex-col">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="self-end mb-4">
            <X className="mr-2 h-4 w-4" /> Quit Game
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription>
              Your current game progress will be lost. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => window.location.reload()}>
              Quit Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex-grow overflow-auto">
        {gameState.gamePhase === "toss" && (
          <Toss
            gameState={gameState}
            updateGameState={updateGameState}
            addCommentary={addCommentary}
          />
        )}
        {(gameState.gamePhase === "batting" ||
          gameState.gamePhase === "bowling") && (
          <Gameplay
            gameState={gameState}
            updateGameState={updateGameState}
            addCommentary={addCommentary}
          />
        )}
        {gameState.gamePhase === "result" && <Result gameState={gameState} />}
      </div>
      <Commentary commentary={commentary} />
    </div>
  );
}
