/**
 * generate-wallet.js
 * Generates a Solana-compatible Ed25519 keypair and saves it as wallet.json.
 * Run: node scripts/generate-wallet.js
 * The output file path is controlled by SOLANA_WALLET_PATH in .env (default: ./wallet.json)
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const walletPath = process.env.SOLANA_WALLET_PATH
  ? path.resolve(__dirname, "..", process.env.SOLANA_WALLET_PATH)
  : path.resolve(__dirname, "../wallet.json");

if (fs.existsSync(walletPath)) {
  console.log(`✅ wallet.json already exists at: ${walletPath}`);
  console.log("   Delete it first if you want to regenerate.");
  process.exit(0);
}

// Generate Ed25519 keypair (Solana uses Ed25519)
const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");

// Export raw bytes — Solana keypair format is 64 bytes: [secretKey(32) + publicKey(32)]
const privRaw = privateKey.export({ type: "pkcs8", format: "der" });
const pubRaw = publicKey.export({ type: "spki", format: "der" });

// PKCS8 Ed25519 private key DER has a 16-byte header; raw seed is the last 32 bytes
const secretSeed = privRaw.slice(privRaw.length - 32);
// SPKI Ed25519 public key DER has a 12-byte header; raw key is the last 32 bytes
const pubKeyBytes = pubRaw.slice(pubRaw.length - 32);

// Solana stores keypair as a 64-byte array: seed (32) + pubkey (32)
const keypair = Buffer.concat([secretSeed, pubKeyBytes]);
const keypairArray = Array.from(keypair);

// Ensure output directory exists
const dir = path.dirname(walletPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(walletPath, JSON.stringify(keypairArray, null, 2));

const pubkeyBase58 = toBase58(pubKeyBytes);
console.log(`✅ Wallet created at: ${walletPath}`);
console.log(`🔑 Public Key (Base58): ${pubkeyBase58}`);
console.log("⚠️  Keep wallet.json secret — add it to .gitignore!");

// Simple Base58 encoder (no external deps)
function toBase58(buffer) {
  const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let num = BigInt("0x" + buffer.toString("hex"));
  let result = "";
  const base = BigInt(58);
  while (num > 0n) {
    const rem = num % base;
    num = num / base;
    result = ALPHABET[Number(rem)] + result;
  }
  for (const byte of buffer) {
    if (byte === 0) result = "1" + result;
    else break;
  }
  return result;
}
