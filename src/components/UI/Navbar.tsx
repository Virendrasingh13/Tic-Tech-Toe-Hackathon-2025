
import { Button } from "@/components/ui/button";
import { PlusIcon, ScanLine } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import TransactionForm from "../Transactions/TransactionForm";
import BillScanner from "../Transactions/BillScanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Navbar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"manual" | "scan">("manual");

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">PixelPurse</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusIcon size={16} />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </DialogTrigger>
            
            <div className="sm:max-w-[425px]">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "manual" | "scan")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="scan" className="flex items-center gap-2">
                    <ScanLine size={16} />
                    <span>Scan Bill</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <TransactionForm onClose={() => setIsFormOpen(false)} />
                </TabsContent>
                <TabsContent value="scan">
                  <BillScanner onClose={() => setIsFormOpen(false)} />
                </TabsContent>
              </Tabs>
            </div>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
