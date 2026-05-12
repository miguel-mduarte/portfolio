import { useSanity } from "./useSanity"
import type { ContactSection } from "../types/contact"

export function useContactSection() {
  return useSanity<ContactSection>(`
    *[_type == "contactSection"][0]{
      title,
      description,
      email,
      phone,
      location,
      availabilityText,
      primaryCta,
      socials
    }
  `)
}