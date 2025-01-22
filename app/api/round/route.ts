import { getRound } from '@/db';
import { NextResponse } from 'next/server';
import { insertRound, insertRoundDepot } from '@/db';
import { QueryResult } from 'pg';
import { Round } from '@/db/types/round';
import { Depot } from '@/db/types/depot-point';

/**
 * @swagger
 * /api/round:
 *   get:
 *     description: Renvoie les différentes tournées.
 *     responses:
 *       200:
 *         description: Renvoie les différentes tournées
 */
export async function GET(): Promise<NextResponse> {
    try {
        const rounds = await getRound();

        return NextResponse.json(rounds);
    } catch (error) {
        return NextResponse.json({ message: error });
    };
}



export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const round = {
            preparationDay: new Date(formData.get('preparationDay') as string),
            deliveryDay: new Date(formData.get('deliveryDay') as string),
        };
        console.log("round dans l'api: " + round.preparationDay);
        const depots = JSON.parse(formData.get('depots') as string);
        console.log("depots dans l'api: " + depots);
        const result = await insertRound(round).returning();
        
        const newRound = result[0];
        console.log("newround: " + newRound.id);

        const roundDepots = depots.map((depot: Depot, index: number) => ({
            roundId: newRound.id,
            depotId: depot.id,
            order: index,
        }));

        await insertRoundDepot(roundDepots);
        
        // Here you would typically insert the new round into your database
        // const newRound = await insertRound({ preparationDay, deliveryDay, depots });

        return NextResponse.json({ message: 'Round inserted successfully' });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

