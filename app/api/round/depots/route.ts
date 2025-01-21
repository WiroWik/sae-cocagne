import { getDepotPointByRoundId } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/round/depots:
 *   get:
 *     description: Renvoie les dépôts d'une tournée spécifique.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tournée
 *     responses:
 *       200:
 *         description: Renvoie les dépôts de la tournée
 *       404:
 *         description: Tournée non trouvée
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const id = req.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID de la tournée requis' }, { status: 400 });
        }

        const depots = await getDepotPointByRoundId(Number(id));

        if (!depots) {
            return NextResponse.json({ message: 'Tournée non trouvée' }, { status: 404 });
        }

        return NextResponse.json(depots);
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}