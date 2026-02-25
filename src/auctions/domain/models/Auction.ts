import * as z from "zod";

const AuctionSchema = z.object({
    id: z.number(),
    title: z.string(),
    current_price: z.float32(),
    end_time: z.string(),
    status: z.number(),
    created_at: z.string(),
    user_id: z.number()
})

export type Auction = z.infer<typeof AuctionSchema>