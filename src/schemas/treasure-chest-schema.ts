import { z } from "zod";

export const treasureChestSchema = z.object({
  title: z
    .string()
    .min(1, "O título do Baú é obrigatório")
    .max(100, "O título não pode ter mais que 100 caracteres"),
  value: z
    .number()
    .int("O valor do Baú deve ser um número inteiro")
    .min(1, "O valor do Baú deve ser pelo menos 1")
    .max(1000000, "O valor do Baú não pode ser maior que 1.000.000"),
  active: z.boolean().default(true),
});

export type TreasureChestFormData = z.infer<typeof treasureChestSchema>;
