import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";

interface ResultProps {
  gameState: GameState;
}

export function Result({ gameState }: ResultProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 border-none shadow-lg">
      <CardContent className="p-6 space-y-6 text-center">
        <h2 className="text-3xl font-bold">
          {gameState.playerScore > gameState.computerScore
            ? "You win!"
            : gameState.playerScore < gameState.computerScore
              ? "Computer wins!"
              : "It's a tie!"}
        </h2>
        <div className="text-xl">
          <p>Your Score: {gameState.playerScore}</p>
          <p>Computer Score: {gameState.computerScore}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          className="bg-green-600 hover:bg-green-700 text-xl py-4 px-8"
        >
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}
