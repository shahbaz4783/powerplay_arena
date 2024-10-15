import { TransactionLists } from "@/src/components/cards/transaction-card";
import { WalletOverview } from "@/src/components/cards/wallet-overview-card";

export default function Treasury() {
  return (
    <div className="space-y-6">
      <WalletOverview />
      <TransactionLists />
    </div>
  );
}
