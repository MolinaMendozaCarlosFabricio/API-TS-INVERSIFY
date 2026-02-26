import * as z from "zod";

export const AuctionSchema = z.object({
    id: z.number(),
    title: z.string(),
    current_price: z.coerce.number(),
    end_time: z.coerce.string(),
    status: z.coerce.boolean(),
    created_at: z.coerce.string(),
    user_id: z.number()
})

export type Auction = z.infer<typeof AuctionSchema>