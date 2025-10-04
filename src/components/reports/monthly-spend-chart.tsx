"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { expenses } from "@/lib/data"
import { format, parseISO } from "date-fns"

const monthlyData = expenses.reduce((acc, expense) => {
    const month = format(parseISO(expense.date), 'MMM yyyy');
    const existing = acc.find(item => item.month === month);
    if(existing) {
        existing.total += expense.amountInCompanyCurrency;
    } else {
        acc.push({ month, total: expense.amountInCompanyCurrency });
    }
    return acc;
}, [] as { month: string, total: number }[]);

// Sort by date for correct chart order
const sortedMonthlyData = monthlyData.sort((a, b) => {
    const dateA = new Date(`01 ${a.month}`);
    const dateB = new Date(`01 ${b.month}`);
    return dateA.getTime() - dateB.getTime();
});

const chartConfig = {
  total: {
    label: "Total Spend",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function MonthlySpendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={sortedMonthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
            tickFormatter={(value) => `$${value/1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
