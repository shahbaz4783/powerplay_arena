import { GameState } from "@/src/lib/types";
import { Badge } from "../ui/badge";

interface ScoreBoardProps {
  gameState: GameState;
}

export function ScoreBoard({ gameState }: ScoreBoardProps) {
  return (
    <div className="flex justify-between items-center border">
      <div>
        <p className="text-4xl font-bold">
          {gameState.gamePhase === "batting"
            ? gameState.playerScore
            : gameState.computerAIScore}
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
  );
}
