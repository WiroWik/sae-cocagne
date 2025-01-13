import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { depotPointsTable, usersTable } from '@/db/schema';
import bcrypt from 'bcrypt';
  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  
  const user: typeof usersTable.$inferInsert = {
    name: 'Utilisateur',
    surname: '1',
    email: 'user1@cocagne.com',
    phoneNumber: '0606060606',
    bankDetails: 'FR7630004000031234567890143',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
  };

  const depotPoint: typeof depotPointsTable.$inferInsert = {
    name: 'Point de dépôt 1',
    adress: '1 rue du dépôt',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };

  await db.insert(usersTable).values(user);

  await db.insert(depotPointsTable).values(depotPoint);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
}

export async function getUser() {
    const result = await db.select().from(usersTable);
    return result
}

export async function getDepotPoint() {
  const result = await db.select().from(depotPointsTable);
  return result
}

main();

