import { isProd, env } from './../../env.ts'
import { Pool } from 'pg'
import * as schema from './schema.ts'
import { drizzle } from 'drizzle-orm/node-postgres'
import { remember } from '@epic-web/remember'

const createPool = () => {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

let client: Pool

if (isProd()) {
  client = createPool()
} else {
  client = remember('dbPool', () => createPool())
}

export const db = drizzle({ client, schema })

export default db
