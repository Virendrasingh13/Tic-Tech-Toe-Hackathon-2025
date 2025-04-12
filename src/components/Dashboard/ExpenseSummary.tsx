
import { useTransactions } from "@/contexts/TransactionContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const ExpenseSummary = () => {
  const { state } = useTransactions();
  const { transactions } = state;
  
  // Calculate summaries
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  const summaryCards = [
    {
      title: "Total Balance",
      value: balance,
      description: "Current balance",
      icon: <Wallet className="h-4 w-4" />,
      trend: balance >= 0 ? "positive" : "negative",
    },
    {
      title: "Income",
      value: totalIncome,
      description: "Total income",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "positive",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      description: "Total expenses",
      icon: <TrendingDown className="h-4 w-4" />,
      trend: "negative",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryCards.map((card, index) => (
        <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div 
              className={`rounded-full p-1 ${
                card.trend === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.abs(card.value).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseSummary;
