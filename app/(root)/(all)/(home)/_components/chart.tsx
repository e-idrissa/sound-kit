"use client"

import * as React from "react"
import { ChartPie, RefreshCw, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ChartDataProps } from "@/lib/types/props"

const chartConfig = {
  instruments: {
    label: "Instruments",
  },
  guitar: {
    label: "Guitar",
    color: "#2563eb",
  },
  bass: {
    label: "Bass",
    color: "#60a5fa",
  },
  drums: {
    label: "Micro",
    color: "#3b82f6",
  },
  piano: {
    label: "Piano",
    color: "#93c5fd",
  },
  others: {
    label: "Other",
    color: "#bfdbfe",
  },
} satisfies ChartConfig

export const InstrumentsChart = ({ chartData }: ChartDataProps) => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0)
  }, [chartData])

  console.log("chartData", chartData)

  return (
    <Card className="flex flex-col bg-background p-0">
      <CardHeader className="items-center p-0">
        <div className="hidden border-input border-b md:flex items-center justify-between w-full text-muted-foreground text-xs p-2">
          <div className="flex items-center gap-2 px-2">
            <ChartPie className="size-4" />
            <span className="text-sm font-medium">Pie Chart</span>
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCw className="size-4" />
          </Button>
        </div>
        <div className="w-full text-center pt-8 md:pt-4 space-y-2">
          <CardTitle>Your Instruments - Usage Resume</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px] md:h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Instruments
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pb-8">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total instruments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
