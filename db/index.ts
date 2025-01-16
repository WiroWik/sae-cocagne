import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { depotPointsTable, roundDepotsTable, roundsTable, usersTable } from '@/db/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { Round } from '@/db/types/round';
import { RoundDepot } from '@/db/types/round-depot';
import { Depot } from '@/db/types/depot-point';
  
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
    name: 'IUT de Saint-Dié-des-Vosges',
    coordinates: '{"lat": 48.29002481817756, "lng" : 6.94225075459547}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint = await db.insert(depotPointsTable).values(depotPoint).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const depotPoint2: typeof depotPointsTable.$inferInsert = {
    name: 'Mairie de Saint-Dié-des-Vosges',
    coordinates: '{"lat": 48.28745134155948, "lng": 6.947785895310519}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint2 = await db.insert(depotPointsTable).values(depotPoint2).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const depotPoint3: typeof depotPointsTable.$inferInsert = {
    name: 'Gare de Saint-Dié-des-Vosges',
    coordinates: '{"lat": 48.28206086785984, "lng": 6.948560754595013}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  };
  const insertedDepotPoint3 = await db.insert(depotPointsTable).values(depotPoint3).returning({ id: depotPointsTable.id });
  console.log('New depot point created!')

  const depotPoint4: typeof depotPointsTable.$inferInsert = {
    name: 'Lycée Georges Baumont',
    coordinates: '{"lat": 48.299049492750335, "lng": 6.947259492990392}',
    contact: '0606060606',
    openTime: new Date(),
    closeTime: new Date(),
  }
  const insertedDepotPoint4 = await db.insert(depotPointsTable).values(depotPoint4).returning({ id: depotPointsTable.id });
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

  const round2: typeof roundsTable.$inferInsert = {
    preparationDay: new Date(),
    deliveryDay: new Date(),
  }; 

  const insertedRound2 = await db.insert(roundsTable).values(round2).returning({ id: roundsTable.id });

  const roundDepot4: typeof roundDepotsTable.$inferInsert = {
    roundId: insertedRound2[0].id,
    depotId: insertedDepotPoint4[0].id,
    order: 1,
  };
  await db.insert(roundDepotsTable).values(roundDepot4);

  const roundDepot5: typeof roundDepotsTable.$inferInsert = {
    roundId: insertedRound2[0].id,
    depotId: insertedDepotPoint[0].id,
    order: 2,
  };
  await db.insert(roundDepotsTable).values(roundDepot5);

  console.log('New round created!')




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

export async function getDepotPointById(id: number) {
  const result = await db.select().from(depotPointsTable).where(eq(depotPointsTable.id, id));
  return result;
}

export async function getDepotPointByRoundId(id: number) : Promise<Depot[]> {
  const result = await db
    .select({
      id: depotPointsTable.id,
      name: depotPointsTable.name,
      coordinates: depotPointsTable.coordinates,
      contact: depotPointsTable.contact,
      openTime: depotPointsTable.openTime,
      closeTime: depotPointsTable.closeTime,
    })
    .from(depotPointsTable)
    .innerJoin(roundDepotsTable, eq(depotPointsTable.id, roundDepotsTable.depotId))
    .where(eq(roundDepotsTable.roundId, id));
  return result;
}

export async function getRound() : Promise<Round[]> {
  const result = await db.select().from(roundsTable);
  return result;
}

export async function getRoundDepots(id: number) : Promise<RoundDepot[]> {
  const result = await db.select().from(roundDepotsTable).where(eq(roundDepotsTable.roundId, id));
  return result;
}

main();

