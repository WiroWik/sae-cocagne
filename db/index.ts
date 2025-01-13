import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { depotPointsTable, roundDepotsTable, roundsTable, usersTable } from '@/db/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {

  await db.delete(usersTable).execute();
  await db.delete(depotPointsTable).execute();
  await db.delete(roundsTable).execute();
  await db.delete(roundDepotsTable).execute();
  console.log('All tables have been reset!');
  
  const user: typeof usersTable.$inferInsert = {
    name: 'Utilisateur',
    surname: '1',
    email: 'user1@cocagne.com',
    phoneNumber: '0606060606',
    bankDetails: 'FR7630004000031234567890143',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
  };
  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const depotPoint: typeof depotPointsTable.$inferInsert = {
    name: 'Point de dépôt 1',
    coordinates: '{"lat": 48.8566, "lng": 2.3522}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint = await db.insert(depotPointsTable).values(depotPoint).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const depotPoint2: typeof depotPointsTable.$inferInsert = {
    name: 'Point de dépôt 2',
    coordinates: '{"lat": 48.8566, "lng": 2.3522}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint2 = await db.insert(depotPointsTable).values(depotPoint2).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const depotPoint3: typeof depotPointsTable.$inferInsert = {
    name: 'Point de dépôt 3',
    coordinates: '{"lat": 48.8566, "lng": 2.3522}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint3 = await db.insert(depotPointsTable).values(depotPoint3).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const round: typeof roundsTable.$inferInsert = {
    preparationDay: new Date(),
    deliveryDay: new Date(),
  };
  const insertedRound = await db.insert(roundsTable).values(round).returning({ id: roundsTable.id });
  console.log('New round created!')

  const roundDepot: typeof roundDepotsTable.$inferInsert = {
    roundId: insertedRound[0].id,
    depotId: insertedDepotPoint[0].id,
    order: 1,
  };
  await db.insert(roundDepotsTable).values(roundDepot);

  const roundDepot2: typeof roundDepotsTable.$inferInsert = {
    roundId: insertedRound[0].id,
    depotId: insertedDepotPoint2[0].id,
    order: 2,
  };
  await db.insert(roundDepotsTable).values(roundDepot2);

  const roundDepot3: typeof roundDepotsTable.$inferInsert = {
    roundId: insertedRound[0].id,
    depotId: insertedDepotPoint3[0].id,
    order: 3,
  };
  await db.insert(roundDepotsTable).values(roundDepot3);


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
    return result;
}

export async function getDepotPoint() {
  const result = await db.select().from(depotPointsTable);
  return result;
}

export async function getRound() {
  const result = await db.select().from(roundsTable);
  return result;
}

export async function getRoundDepots(id: number) {
  const result = await db.select().from(roundDepotsTable).where(eq(roundDepotsTable.roundId, id));
  return result;
}

main();

