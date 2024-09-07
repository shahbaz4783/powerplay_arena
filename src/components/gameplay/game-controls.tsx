import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";

interface GameControlsProps {
  gameState: GameState;
  handleBatting: (option: "normal" | "aggressive" | "defensive") => void;
  handleBowling: (option: "normal" | "yorker" | "bouncer") => void;
}

export function GameControls({ gameState, handleBatting, handleBowling }: GameControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {gameState.gamePhase === "batting" ? (
        <>
          <Button
            onClick={() => handleBatting("aggressive")}
            className="bg-red-600 hover:bg-red-700"
          >
            Loft
          </Button>
          <Button
            onClick={() => handleBatting("normal")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Stroke
          </Button>
          <Button
            onClick={() => handleBatting("defensive")}
            className="bg-green-600 hover:bg-green-700"
          >
            Push
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
  );
}