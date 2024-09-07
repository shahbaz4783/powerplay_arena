import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import {
  calculateRunRate,
  calculateRequiredRunRate,
  calculateRunsScored,
} from "@/src/lib/game-logics";
import { GameState } from "@/src/lib/types";

interface GameplayProps {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  addCommentary: (text: string) => void;
}

export function Gameplay({
  gameState,
  updateGameState,
  addCommentary,
}: GameplayProps) {
  const handleBatting = (option: "normal" | "aggressive" | "defensive") => {
    const runsScored = calculateRunsScored(option);
    if (runsScored === -1) {
      updateGameState({ wickets: gameState.wickets + 1 });
      addCommentary("Out!");
    } else {
      if (gameState.gamePhase === "batting") {
        updateGameState({ playerScore: gameState.playerScore + runsScored });
      } else {
        updateGameState({
          computerScore: gameState.computerScore + runsScored,
        });
      }
      addCommentary(`${runsScored} runs scored`);
    }
    updateOversBalls();
  };

  const handleBowling = (option: "normal" | "yorker" | "bouncer") => {
    const runsScored = calculateRunsScored("normal"); // Simplification: computer always bats 'normal'
    if (runsScored === -1) {
      updateGameState({ wickets: gameState.wickets + 1 });
      addCommentary("Out!");
    } else {
      if (gameState.gamePhase === "batting") {
        updateGameState({ playerScore: gameState.playerScore + runsScored });
      } else {
        updateGameState({
          computerScore: gameState.computerScore + runsScored,
        });
      }
      addCommentary(`${runsScored} runs conceded`);
    }
    updateOversBalls();
  };

  const updateOversBalls = () => {
    if (gameState.balls === 5) {
      updateGameState({ overs: gameState.overs + 1, balls: 0 });
    } else {
      updateGameState({ balls: gameState.balls + 1 });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-900 to-blue-900 border-none shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">
              {gameState.gamePhase === "batting"
                ? gameState.playerScore
                : gameState.computerScore}
              /{gameState.wickets}
            </p>
            <p className="text-lg text-gray-300">
              ({gameState.overs}.{gameState.balls} overs)
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-yellow-400 border-yellow-400 text-lg py-1 px-3"
          >
            {gameState.currentInnings === 1 ? "1st Innings" : "2nd Innings"}
          </Badge>
        </div>
        {gameState.target && (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
            <p className="text-lg font-semibold">Target: {gameState.target}</p>
            <p className="text-gray-300">
              Need{" "}
              {gameState.target -
                (gameState.gamePhase === "batting"
                  ? gameState.playerScore
                  : gameState.computerScore)}{" "}
              runs from {5 * 6 - (gameState.overs * 6 + gameState.balls)} balls
            </p>
            <p className="text-gray-300">
              Required Run Rate: {calculateRequiredRunRate(gameState)}
            </p>
          </div>
        )}
        <Progress
          value={((gameState.overs * 6 + gameState.balls) / (5 * 6)) * 100}
          className="h-3"
        />
        <div className="flex justify-between text-sm text-gray-300">
          <span>Run Rate: {calculateRunRate(gameState)}</span>
          <span>
            Economy:{" "}
            {calculateRunRate({
              ...gameState,
              gamePhase:
                gameState.gamePhase === "batting" ? "bowling" : "batting",
            })}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {gameState.gamePhase === "batting" ? (
            <>
              <Button
                onClick={() => handleBatting("normal")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Normal Shot
              </Button>
              <Button
                onClick={() => handleBatting("aggressive")}
                className="bg-red-600 hover:bg-red-700"
              >
                Aggressive Shot
              </Button>
              <Button
                onClick={() => handleBatting("defensive")}
                className="bg-green-600 hover:bg-green-700"
              >
                Defensive Shot
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleBowling("normal")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Normal Ball
              </Button>
              <Button
                onClick={() => handleBowling("yorker")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Yorker
              </Button>
              <Button
                onClick={() => handleBowling("bouncer")}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Bouncer
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
