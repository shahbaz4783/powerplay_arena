import { GameModes } from "@/src/components/home/game-modes";
import { NavCards } from "@/src/components/home/navs";
import { DailyBonus } from "@/src/components/home/daily-bonus";
import UserInfo from "@/src/components/home/userInfo";

const MiniAppHomePage = () => {
  return (
    <div className="space-y-5 min-h-[84svh] flex flex-col justify-between">
      <UserInfo />
      <GameModes />
      <DailyBonus />
      <NavCards />
    </div>
  );
};

export default MiniAppHomePage;
