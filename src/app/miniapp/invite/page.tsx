import { InviteBonusInfo } from "@/src/components/earn/invite-bonus-info";
import { InviteLink } from "@/src/components/earn/invite-link";
import { InviteList } from "@/src/components/earn/invite-list";
import GradualSpacing from "@/src/components/magicui/gradual-spacing";

const StatsPage = () => {
  return (
    <div className="space-y-5">
      <div className="min-h-[20svh] flex justify-center items-center">
        <GradualSpacing
          className="text-center text-2xl font-bold tracking-[-0.1em]"
          text="Invite Your Friends"
        />
      </div>
      <InviteLink />
      <InviteBonusInfo />
      <InviteList />
    </div>
  );
};

export default StatsPage;
