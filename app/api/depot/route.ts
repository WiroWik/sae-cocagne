import { NextApiRequest, NextApiResponse } from 'next';
import { Depot } from '@/db/types/depot-point'; // Adjust the import path as necessary
import { getDepotPoint, insertDepot } from '@/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const depots = await getDepotPoint();

        return Response.json(depots);
    } catch (error) {
        return { message: (error as any).message };
    }
}

