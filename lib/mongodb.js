// =====================================================================
//  MongoDB client for the live "Send Wishes" guestbook.
//  You do NOT need to edit this file — just set the environment
//  variables (see .env.local.example): locally in .env.local, and in
//  production under Vercel -> Settings -> Environment Variables.
//
//  If MONGODB_URI is not set, this stays disabled and the site falls
//  back to saving wishes in the visitor's own browser — nothing breaks.
// =====================================================================
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "wedding";
const collectionName = process.env.MONGODB_COLLECTION || "wishes";

export const isMongoConfigured = !!uri && uri.startsWith("mongodb");

const options = { maxPoolSize: 10 };

let clientPromise = null;
let indexReady = false;

// One connection is created and reused across requests. On Vercel the module
// stays warm between invocations, so we avoid opening a new socket every time.
function connect() {
  if (!isMongoConfigured) return null;

  if (process.env.NODE_ENV === "development") {
    // Reuse across hot reloads so dev doesn't leak connections.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, options).connect();
  }
  return clientPromise;
}

export async function getWishesCollection() {
  const cp = connect();
  if (!cp) return null;
  const client = await cp;
  const col = client.db(dbName).collection(collectionName);

  // Create the collection + a sort index on first use (idempotent, once per process).
  if (!indexReady) {
    indexReady = true;
    try {
      await col.createIndex({ created_at: -1 });
    } catch (err) {
      indexReady = false; // let a later call retry if this one failed
      console.error("[mongodb] ensure index failed:", err.message);
    }
  }

  return col;
}
