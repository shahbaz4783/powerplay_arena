"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import batsmanImg from "@/assets/quickplay.png";
import trophyImg from "@/assets/tournament.png";
import Link from "next/link";
import { motion } from "framer-motion";

export function GameModes() {
  return (
    <motion.section
      className="grid grid-cols-2 min-h-40 gap-4 mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        className="backdrop-blur-md rounded-xl overflow-hidden bg-no-repeat"
        style={{
          backgroundImage: `url(${batsmanImg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Link href={"/game/quickplay"}>
          <CardContent className="h-full flex flex-col items-center justify-end bg-sky-200 bg-opacity-15"></CardContent>
        </Link>
      </Card>
      <Card
        className="bg-slate-100 backdrop-blur-md rounded-xl overflow-hidden bg-no-repeat"
        style={{
          backgroundImage: `url(${trophyImg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Link href={"/game/tournament"}>
          <CardContent className="h-full flex flex-col items-center justify-end bg-sky-200 bg-opacity-20"></CardContent>
        </Link>
      </Card>
    </motion.section>
  );
}
