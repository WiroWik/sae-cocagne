import { getDepotPoint, insertDepot } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const depots = await getDepotPoint();

        return NextResponse.json(depots);
    } catch (error) {
        return { message: (error as any).message };
    }
}

export async function POST(req: NextRequest) {
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
        return { message: (error as any).message };
    }
}
