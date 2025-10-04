"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Calendar as CalendarIcon, ScanLine, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { runOcr } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/lib/types";

const expenseFormSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  currency: z.string().min(3, "Currency is required."),
  category: z.enum(["Travel", "Food", "Rent", "Software", "Other"]),
  description: z.string().min(3, "Description is required."),
  date: z.date({ required_error: "A date is required." }),
  receipt: z.any().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

type ExpenseFormSheetProps = {
    onExpenseAdded: (expense: Expense) => void;
}

export function ExpenseFormSheet({ onExpenseAdded }: ExpenseFormSheetProps) {
  const [open, setOpen] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      currency: "USD",
      description: "",
      amount: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleOcr = async () => {
    if (!receiptPreview) {
        toast({ title: "No receipt image", description: "Please upload a receipt image first.", variant: "destructive" });
        return;
    }
    setIsOcrLoading(true);
    const result = await runOcr({ photoDataUri: receiptPreview });
    setIsOcrLoading(false);

    if (result.success && result.data) {
        toast({ title: "OCR Successful", description: "Receipt data has been autofilled." });
        const { amount, date, vendorName } = result.data;
        form.setValue("amount", parseFloat(amount) || 0);
        form.setValue("description", vendorName || form.getValues("description"));
        // This is a basic date parse, a real app would need more robust logic
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            form.setValue("date", parsedDate);
        }
    } else {
        toast({ title: "OCR Failed", description: result.error, variant: "destructive" });
    }
  };

  function onSubmit(data: ExpenseFormValues) {
    if(!user) return;
    const newExpense: Expense = {
        id: `exp_${Date.now()}`,
        employeeId: user.id,
        employeeName: user.name,
        amount: data.amount,
        currency: data.currency,
        amountInCompanyCurrency: data.amount, // Assume 1:1 for demo
        category: data.category,
        description: data.description,
        date: data.date.toISOString(),
        receiptUrl: receiptPreview || 'https://picsum.photos/seed/receipt/400/600',
        status: 'pending',
        approverStage: 1,
        approvalHistory: [],
        createdAt: new Date().toISOString(),
    }
    onExpenseAdded(newExpense);
    toast({ title: "Expense submitted", description: "Your expense has been submitted for approval." });
    form.reset();
    setReceiptFile(null);
    setReceiptPreview(null);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Expense
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Submit New Expense</SheetTitle>
          <SheetDescription>
            Fill out the details below. Upload a receipt for quick OCR-powered entry.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="receipt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                  </FormControl>
                  {receiptPreview && (
                    <div className="mt-2 space-y-2">
                        <img src={receiptPreview} alt="Receipt preview" className="w-full h-auto max-h-48 object-contain rounded-md border" />
                        <Button type="button" onClick={handleOcr} disabled={isOcrLoading} className="w-full">
                            {isOcrLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ScanLine className="mr-2 h-4 w-4" />}
                            {isOcrLoading ? "Scanning..." : "Scan with AI"}
                        </Button>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Client dinner at The Grand Restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Expense</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Expense</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
