import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useCricketGameState } from "@/src/lib/store";
import { getCurrentInningsData } from "@/src/lib/game-logics";

export function ScoreBoard() {
  const { gameState } = useCricketGameState();
  const {
    matchSetup: { overs },
  } = gameState;

  const { runs, runRate, wickets, oversPlayed, ballsFaced } =
    getCurrentInningsData(gameState);

  return (
    <section className="space-y-4 bg-slate-800/50 backdrop-blur-md rounded-xl p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-4xl font-bold">
            {runs}/{wickets}
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-yellow-400 border-yellow-400 text-lg py-1 px-3"
        >
          {gameState.currentInnings === 1 ? "1st Innings" : "2nd Innings"}
        </Badge>
      </div>
      <div className="flex justify-between">
        <div className="space-x-1">
          <span className="text-sm text-slate-400">Over:</span>
          <span className="text-gray-300">{oversPlayed}</span>
          <span className="text-gray-300">({overs})</span>
        </div>
        <div className="space-x-1">
          <span className="text-sm text-slate-400">Run Rate:</span>
          <span className="text-gray-300">{runRate}</span>
        </div>
      </div>
      <Progress value={(ballsFaced / (overs * 6)) * 100} className="h-3" />
    </section>
  );
}
