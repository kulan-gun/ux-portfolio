/** Salted SHA-256 gates for password-protected case studies. */

export type GatedPage = {
  title: string
  kicker: string
  salt: string
  hash: string
  sessionKey: string
}

export const gatedPages = {
  contentnext: {
    title: "ContentNext",
    kicker: "Private case study",
    salt: "kulangun-contentnext-v1",
    hash: "a5235e19e6f7dbc46d81c52c6a3ef313ac753b468f494d75a76f9015b5571bf4",
    sessionKey: "contentnext-access",
  },
  homeOffice: {
    title: "Digital identity and contactless travel",
    kicker: "Home Office",
    salt: "kulangun-home-office-v1",
    hash: "330cc5c2ec695ffbd6466ff5e7317f6dec524d0d97a142dacab1c128624ea282",
    sessionKey: "home-office-access",
  },
} as const satisfies Record<string, GatedPage>

export async function hashPagePassword(salt: string, password: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}${password}`)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function hashesMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}
