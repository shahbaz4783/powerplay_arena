import { Card, CardContent } from "@/src/components/ui/card";
import batsmanImg from "@/assets/batsman.png";
import trophyImg from "@/assets/trophy.png";
import Link from "next/link";

export function GameModes() {
  return (
    <section className="grid grid-cols-2 min-h-40 gap-4 mb-6">
      <Card
        className="bg-blue-700 rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${batsmanImg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Link href={"/game/quick-play"}>
          <CardContent className="h-full flex flex-col items-center justify-end bg-sky-200 bg-opacity-15">
            <h3 className="text-lg font-bold bg-stone-300 text-sky-900 px-3 bg-opacity-80 rounded">
              Quick Match
            </h3>
          </CardContent>
        </Link>
      </Card>
      <Card
        className="bg-blue-700 rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${trophyImg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Link href={"/game/tournament"}>
          <CardContent className="h-full flex flex-col items-center justify-end bg-sky-200 bg-opacity-20">
            <h3 className="text-lg font-bold bg-stone-300 text-sky-900 px-3 bg-opacity-80 rounded">
              Tournament
            </h3>
          </CardContent>
        </Link>
      </Card>
    </section>
  );
}
