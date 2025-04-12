
import { useState } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { TransactionType, categories } from "@/data/initialData";

const BillScanner = ({ onClose }: { onClose: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    amount: number;
    description: string;
    category: string;
    date: string;
  } | null>(null);
  
  const { addTransaction } = useTransactions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Reset scan result when a new file is selected
      setScanResult(null);
    }
  };

  const scanBill = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a bill image to scan",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);

    try {
      // In a real implementation, this would call an AI service API
      // For demo purposes, we'll simulate scanning with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate extracted data from the bill
      // In a real implementation, this data would come from the AI service
      const mockScanResult = {
        amount: Math.floor(Math.random() * 100) + 10,
        description: "Grocery Shopping",
        category: "food",
        date: new Date().toISOString().substring(0, 10)
      };
      
      setScanResult(mockScanResult);
      
      toast({
        title: "Bill scanned successfully",
        description: `Detected amount: $${mockScanResult.amount}`,
      });
    } catch (error) {
      console.error("Error scanning bill:", error);
      toast({
        title: "Scanning failed",
        description: "Could not scan the bill image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const addScannedTransaction = () => {
    if (!scanResult) return;
    
    addTransaction({
      amount: scanResult.amount,
      description: scanResult.description,
      category: scanResult.category as keyof typeof categories,
      date: scanResult.date,
      type: "expense" as TransactionType
    });
    
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:border-primary/50 transition-colors">
        <label htmlFor="bill-image" className="w-full cursor-pointer">
          <div className="flex flex-col items-center justify-center py-4">
            {previewUrl ? (
              <div className="relative w-full max-w-sm mx-auto mb-4">
                <img 
                  src={previewUrl} 
                  alt="Bill preview" 
                  className="max-h-64 max-w-full mx-auto rounded-md object-contain" 
                />
              </div>
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            <p className="text-sm text-muted-foreground">
              {previewUrl ? "Click to change image" : "Upload bill image"}
            </p>
          </div>
          <Input 
            id="bill-image" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      <Button 
        onClick={scanBill} 
        disabled={!selectedFile || isScanning} 
        className="w-full"
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Scanning...
          </>
        ) : (
          "Scan Bill"
        )}
      </Button>
      
      {scanResult && (
        <div className="p-4 border rounded-lg mt-4 bg-background/50">
          <h3 className="font-medium mb-2">Detected Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">${scanResult.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium">{scanResult.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{categories[scanResult.category as keyof typeof categories]?.name || scanResult.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{scanResult.date}</span>
            </div>
          </div>
          
          <Button onClick={addScannedTransaction} className="w-full mt-4">
            Add Transaction
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillScanner;
