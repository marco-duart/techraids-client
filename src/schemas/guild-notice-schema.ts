import { z } from "zod";

export const guildNoticePrioritySchema = z.enum([
  "low",
  "normal",
  "high",
  "critical",
]);

export const guildNoticeSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  content: z
    .string()
    .min(1, "Conteúdo é obrigatório")
    .max(1000, "Conteúdo deve ter no máximo 1000 caracteres"),
  priority: guildNoticePrioritySchema.optional().default("normal"),
  active: z.boolean().default(true),
});

export type GuildNoticeFormData = z.infer<typeof guildNoticeSchema>;
