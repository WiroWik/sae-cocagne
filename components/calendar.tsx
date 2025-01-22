'use client'
import { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fr-FR');
const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Preparation Day',
        start: new Date(2023, 10, 10),
        end: new Date(2023, 10, 10),
    },
    {
        title: 'Delivery Day',
        start: new Date(2023, 10, 11),
        end: new Date(2023, 10, 11),
    },
];


export default function ReactCalendar() {
    const [myEvents, setMyEvents] = useState(events);
    const [view, setView] = useState<View>(Views.MONTH)

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

    return (
        <>
            <Calendar
                view={view}
                defaultView={Views.MONTH}
                views={['month', 'week', 'day', 'agenda']}
                toolbar={true}
                popup={true}
                localizer={localizer}
                events={myEvents}
                step={60} 
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
                onView={handleOnChangeView}
                onNavigate={onNavigate}
                date={date}
            />
        </>
    );
}