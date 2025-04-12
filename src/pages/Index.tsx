
import { TransactionProvider } from "@/contexts/TransactionContext";
import Navbar from "@/components/UI/Navbar";
import ExpenseSummary from "@/components/Dashboard/ExpenseSummary";
import ExpenseChart from "@/components/Dashboard/ExpenseChart";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import TransactionList from "@/components/Transactions/TransactionList";

const Index = () => {
  return (
    <TransactionProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-6 space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <ExpenseSummary />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-1 lg:col-span-2">
              <ExpenseChart />
            </div>
            <div>
              <RecentTransactions />
            </div>
          </div>
          
          <TransactionList />
        </main>
      </div>
    </TransactionProvider>
  );
};

export default Index;
