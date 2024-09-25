import { token } from "@/src/lib/constants";

export function RewardItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: any;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-xl">
      <Icon className="w-6 h-6 text-cyan-400" />
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className=" font-bold">
          {value} {token.symbol}
        </p>
      </div>
    </div>
  );
}
