import { InviteBonusInfo } from "@/src/components/earn/invite-bonus-info";
import { InviteLink } from "@/src/components/earn/invite-link";
import { InviteList } from "@/src/components/earn/invite-list";
import { Header } from "@/src/components/shared/header";

const InvitePage = () => {
  return (
    <div className="space-y-5">
      <Header
        title="Grow Your Team"
        subtitle="Invite friends and earn bonuses together"
      />
      <InviteLink />
      <InviteBonusInfo />
      <InviteList />
    </div>
  );
};

export default InvitePage;
