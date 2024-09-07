"use client";

import Link from "next/link";
import { NAVIGATION_LINKS } from "../../lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 m-auto flex justify-evenly py-4 gap-6 w-full  bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black text-white">
      {NAVIGATION_LINKS.map((item) => (
        <Link key={item.href} href={item.href}>
          <div
            className={cn(
              "flex text-xs flex-col justify-center text-slate-300 gap-1 items-center",
              {
                "text-yellow-300": pathname === item.href,
              },
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.title}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
