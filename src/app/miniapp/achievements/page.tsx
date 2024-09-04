import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export default function AchievementPage() {
  return (
    <>
      <Tabs defaultValue="awards">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="awards">hello 1</TabsContent>
        <TabsContent value="challenges">hello 2</TabsContent>
        <TabsContent value="invites">hello 3</TabsContent>
      </Tabs>
    </>
  );
}
