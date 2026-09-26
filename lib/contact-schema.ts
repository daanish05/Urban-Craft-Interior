import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  location: z.string().min(2, "Please enter your location."),
  propertyType: z.string().min(1, "Select a property type."),
  requirement: z.string().min(10, "Tell us a little about your project."),
  budget: z.string().min(1, "Select a budget range."),
  preferredContact: z.string().min(1, "Select a preferred contact method."),
});

export type ContactInput = z.infer<typeof contactSchema>;
