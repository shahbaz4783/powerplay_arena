"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";
import { StatCard } from "../cards/stats-card";
import SectionHeading from "../shared/section-heading";
import { motion } from "framer-motion";

export const description = "A radial chart with stacked sections";

const chartData = [{ won: 65, lost: 47 }];

const chartConfig = {
  won: {
    label: "Won",
    color: "hsl(var(--chart-2))",
  },
  lost: {
    label: "Lost",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PerformanceStats() {
  const totalMatches = chartData[0].lost + chartData[0].won;

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        <StatCard
          title="Tournament Won"
          value={8}
          color="from-purple-500 to-pink-300"
        />
        <StatCard
          title="Win %"
          value={64.42}
          color="from-purple-500 to-pink-300"
        />
        <ChartContainer
          config={chartConfig}
          className="row-span-2 mx-auto aspect-square w-full max-w-[250px] bg-slate-800/50 backdrop-blur-md rounded-xl"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalMatches.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total matches
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="lost"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-lost)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="won"
              fill="var(--color-won)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </motion.section>
  );
}
