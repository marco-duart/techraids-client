import { z } from "zod";

export const missionStatusSchema = z.enum(["pending", "approved", "rejected"]);

export const missionSchema = z.object({
  title: z
    .string()
    .min(1, "O título da quest é obrigatório")
    .max(100, "O título não pode ter mais que 100 caracteres"),

  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(1000, "A descrição não pode ter mais que 1000 caracteres"),

  status: missionStatusSchema.optional().default("pending"),

  gold_reward: z
    .number()
    .int("O ouro deve ser um número inteiro")
    .min(0, "O ouro não pode ser negativo")
    .max(1000, "O ouro não pode ser maior que 1.000")
    .default(0),
});

export type MissionFormData = z.infer<typeof missionSchema>;
