import MilestonesPage from "@/src/components/achievements/game-milestones";
import { InviteMilestones } from "@/src/components/achievements/invite-milestones";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export default function AchievementPage() {
  return (
    <>
      <Tabs defaultValue="challenges">
        <TabsList className="grid w-full grid-cols-3 rounded-xl p-2 h-auto">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="challenges">
          <MilestonesPage />
        </TabsContent>
        <TabsContent value="awards">Your awards will display here.</TabsContent>
        <TabsContent value="invites">
          <InviteMilestones />
        </TabsContent>
      </Tabs>
    </>
  );
}
