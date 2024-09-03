import { InviteLink } from "@/src/components/earn/invite-link";
import GradualSpacing from "@/src/components/magicui/gradual-spacing";

const StatsPage = () => {
  return (
    <div>
      <div className="min-h-[20svh] flex justify-center items-center">
        <GradualSpacing
          className="text-center text-2xl font-bold tracking-[-0.1em]"
          text="Invite Your Friends"
        />
      </div>
      <InviteLink />
    </div>
  );
};

export default StatsPage;
