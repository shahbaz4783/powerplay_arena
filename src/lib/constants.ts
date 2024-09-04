import {
  Award,
  Badge,
  ChartNoAxesColumn,
  ClipboardList,
  House,
  Instagram,
  MessageCircle,
  Pickaxe,
  Twitter,
  Users,
  WalletMinimal,
} from "lucide-react";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

export const NAVIGATION_LINKS = [
  {
    title: "Home",
    href: "/miniapp",
    icon: House,
  },
  {
    title: "Achievements",
    href: "/miniapp/achievements",
    icon: Award,
  },
  {
    title: "Tasks",
    href: "/miniapp/tasks",
    icon: ClipboardList,
  },
  {
    title: "Invite",
    href: "/miniapp/invite",
    icon: Users,
  },
  {
    title: "Wallet",
    href: "/miniapp/wallet",
    icon: WalletMinimal,
  },
];

export const SOCIAL_TASKS_LIST = [
  {
    title: "Join our TG group",
    icon: FaTelegramPlane,
    reward: 80,
    href: "https://t.me/powerplay_arena",
  },
  {
    title: "Follow on Twitter",
    icon: FaXTwitter,
    reward: 90,
    href: "https://x.com/shahbaz4783",
  },
  {
    title: "Join our Discord",
    icon: FaDiscord,
    reward: 60,
    href: "https://x.com/shahbaz4783",
  },
  {
    title: "Follow on Instagram",
    icon: FaInstagram,
    reward: 50,
    href: "https://x.com/shahbaz4783",
  },
];

export const token = {
  name: "Powercoin",
  symbol: "PWR",
  totalSupply: 10000000,
  decimals: 18,
};
