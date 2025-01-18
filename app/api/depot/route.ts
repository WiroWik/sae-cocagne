import { getDepotPoint, insertDepot } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/depot:
 *   get:
 *     description: Renvoie les différents points de dépôt.
 *     responses:
 *       200:
 *         description: Renvoie les différents points de dépôt
 */
export async function GET(): Promise<NextResponse> {
    try {
        const depots = await getDepotPoint();

        return NextResponse.json(depots);
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

/**
 * @swagger
 * /api/depot:
 *   post:
 *     description: Insère un point de dépôt.
 *     parameters:
 *       - in: formData
 *         name: name
 *         required: true
 *         description: Nom du point de dépôt
 *         schema:
 *           type: string
 *       - in: formData
 *         name: coordinates
 *         required: true
 *         description: Coordonnées du point de dépôt
 *         schema:
 *           type: string({'lat':longitude,'lng':latitude})
 *       - in: formData
 *         name: contact
 *         required: true
 *         description: Contact du point de dépôt
 *         schema:
 *           type: string
 *       - in: formData
 *         name: openTime
 *         required: true
 *         description: Heure d'ouverture du point de dépôt
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: formData
 *         name: closeTime
 *         required: true
 *         description: Heure de fermeture du point de dépôt
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Insère un point de dépôt dans la base de données
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = await req.formData();
        const depot = {
            name: data.get('name') as string,
            coordinates: data.get('coordinates') as string,
            contact: data.get('contact') as string,
            openTime: new Date(data.get('openTime') as string),
            closeTime: new Date(data.get('closeTime') as string),
        };

        await insertDepot(depot);

        return NextResponse.json({depot});
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}
