import {
  Award,
  Badge,
  ChartNoAxesColumn,
  ClipboardList,
  House,
  Instagram,
  MessageCircle,
  Pickaxe,
  ShoppingBag,
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
    href: "/miniapp/achievements",
    icon: Award,
  },
  {
    title: "Shop",
    href: "/miniapp/shop",
    icon: ShoppingBag,
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
	name: 'Power Coin',
	pass: 'Power Pass',
	symbol: 'PWR',
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
  "The only way to prove that you're a good sport is to lose.",
  "Winning isn't everything, but wanting to win is.",
  "In cricket, as in life, the key is to find the gaps and make them count.",
  "Remember: Even the best batsmen started with a duck. Keep swinging!",
  "Your attitude determines your direction. Stay positive, stay winning!",
  "Cricket is not just a game, it's a way of life. Live it, love it!",
  "The difference between ordinary and extraordinary is that little 'extra'. Give it your all!",
  "Pressure is a privilege - it only comes to those who earn it.",
  "In the game of cricket, and in the game of life, it's important to play with a straight bat.",
  "Don't play for survival, play for victory. Attack is sometimes the best defense!",
  "Great players are willing to give up the good to go for the great.",
  "Cricket is a game of inches. The inches we need are everywhere around us.",
  "Your biggest rival is yourself. Beat yesterday's performance today!",
  "Like in cricket, life will throw you googlies. Learn to read them and hit them out of the park!",
  "Form is temporary, class is permanent. Keep honing your skills!",
  "In cricket and in life, it's not about the size of the dog in the fight, it's about the size of the fight in the dog.",
  "Remember: Every champion was once a contender that refused to give up.",
  "Cricket is a team game. Individual brilliance wins matches, but teamwork wins championships.",
  "Stay focused, stay humble. The moment you think you've made it, that's when you start falling behind.",
  "The key to batting is rotating the strike. Keep the scoreboard ticking!",
  "Respect the game, and the game will respect you back.",
  "Like a good innings, success in life is all about building partnerships.",
  "Don't wait for the perfect moment. Take the moment and make it perfect.",
  "In cricket, as in life, it's not about how hard you can hit, it's about how hard you can get hit and keep moving forward.",
  "Your determination today leads to your success tomorrow. Keep pushing!",
  "Cricket teaches us that every ball is an opportunity. Make each one count!",
  "The pitch might change, but your commitment to excellence shouldn't. Adapt and overcome!",
];

export const QUICK_PLAY_ENTRY_FEES = [
  {
    amount: 50,
    rewards: {
      six: 6,
      four: 4,
      wicket: 10,
      runMargin: 3,
      wicketMargin: 10,
    },
  },
  {
    amount: 100,
    rewards: {
      six: 12,
      four: 8,
      wicket: 20,
      runMargin: 6,
      wicketMargin: 20,
    },
  },
  {
    amount: 200,
    rewards: {
      six: 24,
      four: 16,
      wicket: 40,
      runMargin: 12,
      wicketMargin: 40,
    },
  },
];

export const XP_THRESHOLDS = [
  0, // Level 1
  5000, // Level 2
  10000, // Level 3
  25000, // Level 4
  50000, // Level 5
  100000, // Level 6
  200000, // Level 7
  400000, // Level 8
  600000, // Level 9
  1000000, // Level 10
];

export const LEVEL_NAMES = [
  "Rookie Batsman",
  "Club Player",
  "First-Class Contender",
  "National Prospect",
  "International Debutant",
  "Test Match Regular",
  "World Cup Hero",
  "Cricket Maestro",
  "Living Legend",
  "Immortal of the Game",
];

export const LEVEL_DATA = [
	{
		level: 1,
		name: 'Rookie Batsman',
		xpThreshold: 0,
	},
	{
		level: 2,
		name: 'Club Player',
		xpThreshold: 2000,
	},
	{
		level: 3,
		name: 'First-Class Contender',
		xpThreshold: 5000,
	},
	{
		level: 4,
		name: 'National Prospect',
		xpThreshold: 15000,
	},
	{
		level: 5,
		name: 'International Debutant',
		xpThreshold: 30000,
	},
	{
		level: 6,
		name: 'Test Match Regular',
		xpThreshold: 50000,
	},
	{
		level: 7,
		name: 'World Cup Hero',
		xpThreshold: 100000,
	},
	{
		level: 8,
		name: 'Cricket Maestro',
		xpThreshold: 200000,
	},
	{
		level: 9,
		name: 'Living Legend',
		xpThreshold: 500000,
	},
	{
		level: 10,
		name: 'Immortal of the Game',
		xpThreshold: 1000000,
	},
];
