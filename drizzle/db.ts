import { env } from '@/data/env/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/drizzle/schema'
import { Pool } from 'pg';

// For Neon and other hosted databases, we often need to enable SSL.
// 'rejectUnauthorized: false' is commonly used with Neon in development/preview environments.
const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });
