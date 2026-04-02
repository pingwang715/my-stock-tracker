import { z } from "zod";

export const portfolioSchema = z.object({
  symbol: z
    .string({invalid_type_error: "Symbol cannot be empty"})
    .min(3, "Symbol must be at least 3 characters")
    .max(20, "Symbol must be at most 20 characters"),
  shares: z
    .number({invalid_type_error: "Shares cannot be empty"})
    .min(1, "Shares must be at least 1")
    .max(1000, "Shares must be at most 1000"),
  purchasePrice: z
    .number({invalid_type_error: "Purchase price cannot be empty"})
    .min(1, "Purchase price must be at least 1")
    .max(1000, "Purchase price must be at most 1000")
    .multipleOf(0.0001, "Purchase price can have at most 4 decimal places"),
  purchaseDate: z
    .string()
    .min(1, "Purchase date cannot be empty")
    .refine((val) => new Date(val) <= new Date(), {
      message: "Purchase date cannot be in the future",
    }),
});
