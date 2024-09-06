import { GameModes } from "@/src/components/game/game-modes";
import { NavCards } from "@/src/components/game/navs";
import { DailyBonus } from "@/src/components/game/daily-bonus";
import UserInfo from "@/src/components/game/userInfo";

const MiniAppHomePage = () => {
  return (
    <div className="space-y-5 min-h-[84svh] flex flex-col justify-between">
      <UserInfo />
      <GameModes />
      <NavCards />
      <DailyBonus />
    </div>
  );
};

export default MiniAppHomePage;
