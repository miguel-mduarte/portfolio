import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"
import React from "react"

type IconComponent = React.ComponentType<LucideProps>

export function getIcon(name: string): IconComponent {
  return (Icons as any)[name] ?? Icons.Link
}