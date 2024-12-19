import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { formatChartData, getCharts, ViewData } from "@/service/dashboardService"

const chartConfig = {
  desktop: {
    label: "Views",
    color: "#4CAF50",
  }
} satisfies ChartConfig



export function OverviewChart() {
  const [chartData, setChartData] = useState<ViewData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharts();
      setChartData(formatChartData(data));
    };
    
    fetchData();
  }, []);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
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
