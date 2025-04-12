
import { useState } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { TransactionType } from "@/data/initialData";
import TransactionItem from "./TransactionItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TransactionList = () => {
  const { state } = useTransactions();
  const [activeTab, setActiveTab] = useState<"all" | TransactionType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter transactions based on activeTab and searchTerm
  const filteredTransactions = state.transactions
    .filter((transaction) => 
      activeTab === "all" || transaction.type === activeTab
    )
    .filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>View and manage your recent transactions</CardDescription>
        
        <div className="mt-2 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | TransactionType)}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="expense" className="flex-1">Expenses</TabsTrigger>
            <TabsTrigger value="income" className="flex-1">Income</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="m-0">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTransactions.length === 0 ? (
                <div className="py-6 text-center text-muted-foreground">
                  No transactions found
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              )}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="expense" className="m-0">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTransactions.length === 0 ? (
                <div className="py-6 text-center text-muted-foreground">
                  No expenses found
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              )}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="income" className="m-0">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTransactions.length === 0 ? (
                <div className="py-6 text-center text-muted-foreground">
                  No income found
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              )}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TransactionList;
