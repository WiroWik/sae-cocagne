import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '@/db/schema';
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
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
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

main();

