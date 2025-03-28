import { z } from "zod";

export const taskStatusSchema = z.enum(["pending", "approved", "rejected"]);

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "O título da quest é obrigatório")
    .max(100, "O título não pode ter mais que 100 caracteres"),

  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(1000, "A descrição não pode ter mais que 1000 caracteres"),

  status: taskStatusSchema.optional().default("pending"),

  experience_reward: z
    .number()
    .int("A experiência deve ser um número inteiro")
    .min(0, "A experiência não pode ser negativa")
    .max(10000, "A experiência não pode ser maior que 10.000")
    .default(0),
});

export type TaskFormData = z.infer<typeof taskSchema>;
