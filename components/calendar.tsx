'use client'
import { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fr-FR');
const localizer = momentLocalizer(moment);

import { useEffect } from 'react';
import { Round } from '@/db/types/round';





export default function ReactCalendar() {
    const [view, setView] = useState<View>(Views.MONTH)
    const [events, setEvents] = useState<{ title: string; start: Date; end: Date; }[]>([]);

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView)
    }

    const [date, setDate] = useState(new Date())
    const onNavigate = useCallback(
        (newDate: Date) => {
            return setDate(newDate)
        },
        [setDate]
    )

    

    const fetchRounds = async () => {
        const response = await fetch('/api/round', { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            const rounds: Round[] = data as Round[];
            const events = rounds.flatMap(round => [
                {
                    title: "Jour de préparation | Tournée n°" + round.id,
                    start: new Date(round.preparationDay),
                    end: new Date(round.preparationDay),
                },
                {
                    title: "Jour de livraison | Tournée n°" + round.id,
                    start: new Date(round.deliveryDay),
                    end: new Date(round.deliveryDay),
                }
            ]);
            setEvents(events);
        } else {
            console.error('Failed to fetch depots:', response.statusText);
        }
    };

    useEffect(() => {
        fetchRounds();
    }, []);

    return (
        <>
            <Calendar
                view={view}
                defaultView={Views.MONTH}
                views={['month', 'week', 'day', 'agenda']}
                toolbar={true}
                popup={true}
                localizer={localizer}
                events={events}
                step={60} 
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, margin: '50px' }}
                onView={handleOnChangeView}
                onNavigate={onNavigate}
                date={date}
            />
        </>
    );
}