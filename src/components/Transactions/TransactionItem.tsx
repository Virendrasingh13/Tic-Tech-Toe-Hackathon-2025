
import { useState } from "react";
import { Transaction, categories } from "@/data/initialData";
import { useTransactions } from "@/contexts/TransactionContext";
import { format } from "date-fns";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import TransactionForm from "./TransactionForm";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { deleteTransaction } = useTransactions();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { id, amount, category, description, date, type } = transaction;
  const categoryInfo = categories[category];
  
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');
  const formattedAmount = amount.toFixed(2);
  
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-full" 
            style={{ backgroundColor: `${categoryInfo.color}15` }}
          >
            <div 
              className="h-2.5 w-2.5 rounded-full" 
              style={{ backgroundColor: categoryInfo.color }}
            />
          </div>
          
          <div>
            <p className="font-medium">{description}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{categoryInfo.name}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={type === 'expense' ? 'expense-amount' : 'income-amount'}>
            {type === 'expense' ? '-' : '+'}${formattedAmount}
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <TransactionForm 
                  onClose={() => setIsEditDialogOpen(false)} 
                  defaultValues={transaction}
                />
              </Dialog>
              
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive" 
                onSelect={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this transaction. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTransaction(id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionItem;
