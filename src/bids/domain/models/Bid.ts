import * as z from "zod";

const BidSchema = z.object({
    id: z.number(),
    auction_id: z.number(),
    user_id: z.number(),
    amount: z.float32(),
    created_at: z.string()
});

export type Bid = z.infer<typeof BidSchema>