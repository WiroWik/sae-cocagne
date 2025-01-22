import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { depotPointsTable, roundDepotsTable, roundsTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Round } from '@/db/types/round';
import { RoundDepot } from '@/db/types/round-depot';
import { Depot } from '@/db/types/depot-point';
  
const db = drizzle(process.env.DATABASE_URL!);

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
    .where(eq(roundDepotsTable.roundId, id))
    .orderBy(roundDepotsTable.order);
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

export function insertDepot(depot: typeof depotPointsTable.$inferInsert) {
  return db.insert(depotPointsTable).values(depot);
}

export function insertRound(round: typeof roundsTable.$inferInsert) {
  return db.insert(roundsTable).values(round);
}

export function insertRoundDepot(roundDepot: typeof roundDepotsTable.$inferInsert) {
  return db.insert(roundDepotsTable).values(roundDepot);
}

