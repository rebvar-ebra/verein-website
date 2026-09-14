import { z } from "zod";
/** Local preview validation; reuse server-side when real submission is implemented. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte gib deinen Namen ein (mindestens 2 Zeichen).")
    .max(100, "Bitte verwende höchstens 100 Zeichen."),
  email: z
    .string()
    .trim()
    .max(254, "Die E-Mail-Adresse ist zu lang.")
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
  subject: z
    .string()
    .trim()
    .min(3, "Bitte gib einen Betreff ein (mindestens 3 Zeichen).")
    .max(150, "Bitte verwende höchstens 150 Zeichen."),
  message: z
    .string()
    .trim()
    .min(10, "Bitte beschreibe dein Anliegen mit mindestens 10 Zeichen.")
    .max(5000, "Bitte verwende höchstens 5.000 Zeichen."),
});
export type ContactInput = z.infer<typeof contactSchema>;
