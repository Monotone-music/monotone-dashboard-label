import { Bar, BarChart, CartesianGrid ,XAxis, YAxis } from "recharts"
import chartData from '../../../data/mockChartData'
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#4CAF50",
  }
} satisfies ChartConfig

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
      <ChartTooltip content={<ChartTooltipContent />} />
      <CartesianGrid vertical={false} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
         <YAxis
      dataKey="desktop"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
     
    />

        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
