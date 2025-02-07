'use client'
import ReactCalendar from "@/components/calendar";

export default function Calendrier() {
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Calendrier des livraisons
            </h1>
            <ReactCalendar />
        </>
    );
}