
import { useMemo } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { categories, Category } from "@/data/initialData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type CategoryTotal = {
  name: string;
  value: number;
  color: string;
  category: Category;
};

const ExpenseChart = () => {
  const { state } = useTransactions();
  
  // Calculate category totals for expenses only
  const categoryTotals = useMemo(() => {
    const totals: Record<Category, number> = {} as Record<Category, number>;
    
    // Initialize with 0
    Object.keys(categories).forEach((category) => {
      totals[category as Category] = 0;
    });
    
    // Sum transactions by category (expenses only)
    state.transactions
      .filter(t => t.type === 'expense')
      .forEach((transaction) => {
        totals[transaction.category] += transaction.amount;
      });
    
    // Convert to array format for the chart and filter out categories with 0 value
    return Object.entries(totals)
      .map(([category, value]) => ({
        name: categories[category as Category].name,
        value,
        color: categories[category as Category].color,
        category: category as Category,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [state.transactions]);
  
  const totalExpenses = useMemo(() => {
    return categoryTotals.reduce((sum, item) => sum + item.value, 0);
  }, [categoryTotals]);

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>
          See where your money is going
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totalExpenses === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            No expense data to display
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">Top Categories</h4>
              <div className="space-y-2">
                {categoryTotals.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{formatCurrency(category.value)}</span>
                      <span className="text-xs text-muted-foreground">
                        {((category.value / totalExpenses) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
