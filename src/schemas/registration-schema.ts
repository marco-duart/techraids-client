import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z
      .string()
      .min(1, "Confirmação de senha é obrigatória"),
    name: z.string().min(1, "Nome completo é obrigatório"),
    nickname: z.string().min(1, "Apelido é obrigatório"),
    guild_id: z
      .string()
      .transform(Number)
      .pipe(z.number().positive("Selecione uma equipe válida")),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });
export type RegistrationFormData = z.infer<typeof registrationSchema>;
