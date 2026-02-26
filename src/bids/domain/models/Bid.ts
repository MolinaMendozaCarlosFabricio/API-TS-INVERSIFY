import * as z from "zod";

export const BidSchema = z.object({
    id: z.number(),
    auction_id: z.number(),
    user_id: z.number(),
    amount: z.coerce.number(),
    created_at: z.string()
});

export type Bid = z.infer<typeof BidSchema>