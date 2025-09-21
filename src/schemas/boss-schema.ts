import { z } from "zod";

export const bossSchema = z.object({
  reward_description: z
    .string()
    .min(1, "A descrição da recompensa é obrigatória"),
});

export type BossFormData = z.infer<typeof bossSchema>;
