export const heroQuery = `*[_type == "heroSection"][0]{
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  socialLinks,
  cvUrl
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage,
  projectUrl,
  tags,
  featured,
  order
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  title,
  description,
  icon,
  featured,
  order
}`;

export const aboutQuery = `*[_type == "aboutSection"][0]{
  title,
  content,
  image,
  skills,
  experience[]{title, company, period, description}
}`;

export const contactQuery = `*[_type == "contactSection"][0]{
  title,
  description,
  email,
  phone,
  location,
  socialLinks
}`;
