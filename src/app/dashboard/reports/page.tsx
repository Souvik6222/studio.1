import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategorySpendChart from "@/components/reports/category-spend-chart";
import MonthlySpendChart from "@/components/reports/monthly-spend-chart";

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">Visual insights into your company's spending.</p>
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Spend by Category</CardTitle>
                        <CardDescription>A breakdown of expenses across different categories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CategorySpendChart />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Spend</CardTitle>
                        <CardDescription>Total expenses over the past few months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MonthlySpendChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
