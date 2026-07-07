import * as z from "zod"

export const submissionSchema = z.object({
  campaign_id: z.string().uuid(),
  proof_url: z.string().url({ message: "Must be a valid URL for the screenshot/proof" }),
  x_username: z.string().optional(),
  x_post_url: z.string().url({ message: "Must be a valid X post URL" }).optional().or(z.literal("")),
})
