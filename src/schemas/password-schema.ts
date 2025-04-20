import { z } from "zod";

export const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(6, "A senha atual deve ter pelo menos 6 caracteres"),
    password: z
      .string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
