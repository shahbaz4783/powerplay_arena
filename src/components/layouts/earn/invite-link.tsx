import { Copy, Share } from "lucide-react";
import ShinyButton from "../../magicui/shiny-button";

export function InviteLink() {
  return (
    <>
      <section className="rounded-xl p-4 bg-slate-800 space-y-4">
        <menu className="flex gap-3 items-center">
          <Share size={34} />
          <div>
            <h3 className="text-xl font-bold">Invite Link</h3>
            <p className="text-slate-400 font-light">Invite your frens and get bonuses!</p>
          </div>
        </menu>
        <div className="flex items-center gap-3">
          <ShinyButton text="INVITE FRENS" />
          <div className="border border-slate-600 rounded-xl p-2 cursor-pointer hover:bg-slate-600 transition-colors">
            <Copy />
          </div>
        </div>
      </section>
    </>
  );
}
