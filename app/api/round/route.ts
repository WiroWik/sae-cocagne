import { getDepotPoint, getRound, insertDepot } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

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
    }
}

