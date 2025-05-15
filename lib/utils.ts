import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import config from "@/auth.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const providerMap = config.providers
  .map((provider) => ({
    id: provider.id,
    name: provider.name,
  }))
  .filter((provider) => provider.id !== "credentials")
