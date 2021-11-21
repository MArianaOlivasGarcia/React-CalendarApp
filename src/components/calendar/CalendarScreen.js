

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar'
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal';
import { messages } from '../../helpers/calendar-messages'
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('es')

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { id } = useSelector(state => state.auth)

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' )


    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [ dispatch ])


    /* Doble click */
    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() )
    }

    /* Un click */
    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) )
    }

    /* Cambia la vista */
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }


    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() )
    }


    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroudColor: (id === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar 
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                components={{
                    event: CalendarEvent
                }}
            />


            <AddNewFab />
            { activeEvent &&
                <DeleteEventFab />
            }

            <CalendarModal />

        </div>
    )
}
