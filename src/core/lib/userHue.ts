/** Stable hue per user for identity tints (not chart data). */
export function userHue(userId: number): number {
  return (userId * 53) % 360
}

export function userTintStyle(userId: number): { backgroundColor: string; color: string } {
  const h = userHue(userId)
  return {
    backgroundColor: `hsl(${h} 42% 92%)`,
    color: `hsl(${h} 35% 28%)`,
  }
}
