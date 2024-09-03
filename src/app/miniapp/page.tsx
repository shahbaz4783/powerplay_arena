import { Game } from "@/src/components/earn/game";
import UserInfo from "./userInfo";

const MiniAppHomePage = async () => {
  return (
    <div className=" border">
      <UserInfo />
      <Game />
    </div>
  );
};

export default MiniAppHomePage;
