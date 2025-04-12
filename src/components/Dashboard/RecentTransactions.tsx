
import { useTransactions } from "@/contexts/TransactionContext";
import { categories } from "@/data/initialData";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import TransactionForm from "../Transactions/TransactionForm";

const RecentTransactions = () => {
  const { state } = useTransactions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Get the 5 most recent transactions
  const recentTransactions = [...state.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Add New
              </Button>
            </DialogTrigger>
            <TransactionForm onClose={() => setIsFormOpen(false)} />
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        {recentTransactions.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => {
              const { id, amount, category, description, date, type } = transaction;
              const categoryInfo = categories[category];
              const formattedDate = format(new Date(date), 'MMM dd');
              
              return (
                <div key={id} className="flex items-center rounded-lg p-2 hover:bg-muted/50">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full mr-3"
                    style={{ backgroundColor: `${categoryInfo.color}15` }}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: categoryInfo.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{description}</p>
                    <p className="text-xs text-muted-foreground">{formattedDate}</p>
                  </div>
                  <p className={type === 'expense' ? 'expense-amount text-sm' : 'income-amount text-sm'}>
                    {type === 'expense' ? '-' : '+'}${amount.toFixed(2)}
                  </p>
                </div>
              );
            })}
            <Button variant="ghost" className="w-full mt-3 text-xs" size="sm">
              View All Transactions
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
