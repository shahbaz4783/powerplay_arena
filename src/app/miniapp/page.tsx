import { GameModes } from "@/src/components/home/game-modes";
import { NavCards } from "@/src/components/home/navs";
import { UserInfoHeader } from "@/src/components/home/user-info-header";
import { fakeDelay } from "@/src/lib/utils";

const MiniAppHomePage = async () => {
  await fakeDelay(50000)
  return (
    <div className="space-y-5 min-h-[84svh]">
      <UserInfoHeader />
      <GameModes />
      <NavCards />
    </div>
  );
};

export default MiniAppHomePage;
