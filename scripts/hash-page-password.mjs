import { createHash } from "node:crypto"

const password = process.argv[2]
const salt = process.argv[3] ?? "kulangun-contentnext-v1"

if (!password) {
  console.error('Usage: npm run hash-page-password -- "your-password" [salt]')
  process.exit(1)
}

const hash = createHash("sha256").update(`${salt}${password}`, "utf8").digest("hex")
console.log(hash)
console.log(`\nSalt used: ${salt}`)
console.log("Paste the hash into the matching page in lib/page-access.ts")
