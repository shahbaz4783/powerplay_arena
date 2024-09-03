import { token } from "@/src/lib/constants";

export function InviteBonusInfo() {
  return (
    <section className="p-4 rounded-xl bg-slate-800 space-y-4">
      <div>
        <h3 className="font-bold">100 {token.symbol} FOR INVITE</h3>
        <p className="font-light text-slate-400 text-sm">
          You'll get 100 {token.symbol} for every invite.
        </p>
      </div>
    </section>
  );
}
