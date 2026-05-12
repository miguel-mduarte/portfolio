export type ContactSection = {
  title: string
  description: string
  email: string
  phone: string
  location: string
  availabilityText?: string
  primaryCta?: {
    label: string
    link: string
  }
  socials?: {
    label: string
    url: string
    icon: string
  }[]
}