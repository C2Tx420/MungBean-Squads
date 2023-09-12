import { BORING_AVATAR_COLOR_PALETTE, BORING_AVATAR_ENDPOINT } from "../config/constant"
import { AvatarColors, AvatarVariant } from "../types/avatar.model"

export function truncateWallet(str: string | undefined | null, length = 4): string {
    if (!str) return "..."
  
    const first = str.slice(0, length)
    const last = str.slice(-length)
  
    return `${first}....${last}`
  }
  
  export function createAvatarURL(
    wallet: string | undefined | null,
    size: number = 120,
    variant: AvatarVariant = "marble",
    colors: AvatarColors = BORING_AVATAR_COLOR_PALETTE
  ) {
    if (!wallet) return new URL(`${variant}/${size}/default?colors=${colors.join(",")}`, BORING_AVATAR_ENDPOINT)
  
    return new URL(`${variant}/${size}/${wallet}?colors=${colors.join(",")}`, BORING_AVATAR_ENDPOINT)
  }