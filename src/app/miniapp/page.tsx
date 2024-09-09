import { GameModes } from "@/src/components/home/game-modes";
import { NavCards } from "@/src/components/home/navs";
import { DailyBonus } from "@/src/components/home/daily-bonus";
import UserInfo from "@/src/components/home/userInfo";
import { UserInfoHeader } from "@/src/components/home/user-info-header";

const MiniAppHomePage = () => {
  return (
    <div className="space-y-5 min-h-[84svh]">
      <UserInfoHeader />
      <GameModes />
      <NavCards />
    </div>
  );
};

export default MiniAppHomePage;
