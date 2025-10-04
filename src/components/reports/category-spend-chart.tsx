"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { expenses } from "@/lib/data"

const chartData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if(existing) {
        existing.amount += expense.amountInCompanyCurrency;
    } else {
        acc.push({ category: expense.category, amount: expense.amountInCompanyCurrency });
    }
    return acc;
}, [] as { category: string, amount: number }[]).map(item => ({...item, fill: `var(--color-${item.category.toLowerCase()})`}));


const chartConfig = {
  amount: {
    label: "Amount",
  },
  travel: {
    label: "Travel",
    color: "hsl(var(--chart-1))",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-2))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-3))",
  },
  software: {
    label: "Software",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export default function CategorySpendChart() {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [])

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius="60%"
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
                      {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
