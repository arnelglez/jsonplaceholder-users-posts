/** Remove control chars and bidi overrides that can spoof UI or break layout. */
export function sanitizeDisplayText(value: string, allowNewlines = false): string {
  let out = ''
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code === 0) continue
    if (!allowNewlines && (code < 32 || code === 127)) continue
    if (allowNewlines && code < 32 && code !== 10 && code !== 13 && code !== 9) continue
  // Unicode bidi / isolation overrides (UI spoofing)
    if (code >= 0x202a && code <= 0x202e) continue
    if (code === 0x2066 || code === 0x2067 || code === 0x2068 || code === 0x2069) continue
    out += char
  }
  return out.trim()
}
