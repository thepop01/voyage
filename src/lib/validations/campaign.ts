import * as z from "zod"

export const campaignSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  requirements: z.string().optional(),
  reward_pool: z.coerce.number().positive({ message: "Reward pool must be greater than 0" }),
  selection_method: z.enum(["admin_selection", "raffle", "hybrid"]),
  max_winners: z.coerce.number().int().positive().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
})
