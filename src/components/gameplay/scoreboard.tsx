import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useCricketGameState } from "@/src/lib/store";
import { getCurrentInningsData } from "@/src/lib/game-logics";

export function ScoreBoard() {
  const { gameState } = useCricketGameState();

  const { runs, runRate, wickets, oversPlayed, ballsFaced } =
    getCurrentInningsData(gameState);

  return (
    <section className="space-y-4 bg-slate-800/50 backdrop-blur-md rounded-xl p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-4xl font-bold">
            {runs}/{wickets}
          </p>
          <p className="text-lg text-gray-300">{oversPlayed}</p>
        </div>
        <Badge
          variant="outline"
          className="text-yellow-400 border-yellow-400 text-lg py-1 px-3"
        >
          {gameState.currentInnings === 1 ? "1st Innings" : "2nd Innings"}
        </Badge>
      </div>
      <div>Run Rate: {runRate}</div>
      <Progress value={(ballsFaced / (5 * 6)) * 100} className="h-3" />
    </section>
  );
}
