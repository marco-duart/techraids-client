import { z } from "zod";

export const rewardStatusSchema = z.enum([
  "physical_item",
  "digital_content",
  "in_game_benefit",
  "real_life_experience",
]);

export const rewardSchema = z.object({
  treasure_chest_id: z
    .number()
    .int("O ID do Baú deve ser um número inteiro")
    .min(1, "O ID do Baú é obrigatório"),
  name: z
    .string()
    .min(1, "O nome do prêmio é obrigatório")
    .max(100, "O nome não pode ter mais que 100 caracteres"),

  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(1000, "A descrição não pode ter mais que 1000 caracteres"),

  reward_type: rewardStatusSchema.optional().default("physical_item"),
  is_limited: z.boolean().default(false),
  stock_quantity: z
    .number()
    .int("A quantidade em estoque deve ser um número inteiro")
    .min(0, "A quantidade em estoque não pode ser negativa")
    .max(1000, "A quantidade em estoque não pode ser maior que 1000")
    .default(0),
});

export type RewardFormData = z.infer<typeof rewardSchema>;
