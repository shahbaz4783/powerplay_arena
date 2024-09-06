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
  UserPlus,
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
    title: "Milestones",
    href: "/miniapp/achievemen",
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
    icon: UserPlus,
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

export const TIPS_AND_QUOTES = [
  "Don't forget to claim your daily rewards to boost your progress!",
  "Every great innings starts with a single run.",
  "In cricket, as in life, it's not about the fall. It's about how you bounce back.",
  "The pitch is your canvas, the bat your brush. Paint your masterpiece.",
  "Champions aren't made in the gym. They are made from something deep inside them - a desire, a dream, a vision.",
  "Cricket is a game of glorious uncertainties. Embrace the challenge!",
  "Timing is everything! Practice your shots in the nets to perfect your timing.",
  "A good captain knows their team. Analyze your players' strengths for the best lineup.",
  "Upgrade your gear regularly to stay competitive in tournaments.",
  "Watch out for special events to earn rare items and big rewards!",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The harder you work, the luckier you get.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "The only way to prove that you’re a good sport is to lose.",
  "Winning isn’t everything, but wanting to win is.",
];
