
import { useState } from "react";
import { Category, TransactionType, categories } from "@/data/initialData";
import { useTransactions } from "@/contexts/TransactionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TransactionFormProps {
  onClose: () => void;
  defaultValues?: {
    id?: string;
    amount: number;
    category: Category;
    description: string;
    date: string;
    type: TransactionType;
  };
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, defaultValues }) => {
  const isEditing = !!defaultValues?.id;
  const { addTransaction, editTransaction } = useTransactions();
  
  const [formData, setFormData] = useState({
    amount: defaultValues?.amount.toString() || "",
    category: defaultValues?.category || "food" as Category,
    description: defaultValues?.description || "",
    date: defaultValues?.date || new Date().toISOString().substring(0, 10),
    type: defaultValues?.type || "expense" as TransactionType,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      type: formData.type
    };
    
    if (isEditing && defaultValues?.id) {
      editTransaction({ ...transaction, id: defaultValues.id });
    } else {
      addTransaction(transaction);
    }
    
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
        <DialogDescription>
          Enter the details of your transaction below.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="type">Transaction Type</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => 
              setFormData(prev => ({ ...prev, type: value as TransactionType }))}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense" className="text-expense">Expense</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income" className="text-income">Income</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              $
            </span>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              className="pl-8"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => 
              setFormData(prev => ({ ...prev, category: value as Category }))}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categories)
                .filter(([key]) => {
                  // Filter categories based on the transaction type (income/expense)
                  if (formData.type === 'income') {
                    return ['salary', 'investment', 'gifts', 'other'].includes(key);
                  }
                  return !['salary', 'investment'].includes(key);
                })
                .map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update" : "Add"} Transaction
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default TransactionForm;
