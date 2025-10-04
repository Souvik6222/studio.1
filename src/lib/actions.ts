"use server";

import { ocrReceiptDataAutofill, OcrReceiptDataAutofillInput } from "@/ai/flows/ocr-receipt-data-autofill";
import { getSpendingTips, SpendingTipsInput } from "@/ai/flows/ai-spending-tips";

export async function runOcr(input: OcrReceiptDataAutofillInput) {
  try {
    const result = await ocrReceiptDataAutofill(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("OCR Error:", error);
    return { success: false, error: "Failed to process receipt." };
  }
}

export async function runSpendingTips(input: SpendingTipsInput) {
    try {
        const result = await getSpendingTips(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI Spending Tips Error:", error);
        return { success: false, error: "Failed to generate spending tips." };
    }
}
