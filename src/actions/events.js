
import Swal from 'sweetalert2'
import { fecthWithToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'
import { types } from '../types/types'


export const eventStartAddNew = ( evento ) => {

    return async( dispatch, getState ) => {

        const { id, name } = getState().auth

        try {

            const resp = await fecthWithToken( 'events', evento, 'POST' )
            const { status, event } = await resp.json()

            if ( status ){

                evento.id = event.id;
                evento.user = {
                    id,
                    name
                }

                dispatch( eventAddNew(evento) )
            }
                
        } catch (error) {
            console.log(error)
        }


    }

}




const eventAddNew = ( event ) => {
    return {
        type: types.eventAddNew,
        payload: event
    }

}


export const eventSetActive = ( event ) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}


export const eventClearActiveEvent = ( event ) => {
    return {
        type: types.eventClearActiveEvent
    }
}



export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {

        try {
            
            const resp = await fecthWithToken(`events/${ event.id }`, event, 'PUT')
            const { status, message } = await resp.json()

            if ( status ) {
                dispatch( eventUpdated(event) )
            } else {
                Swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error'
                })
            }

        } catch (error) {
            console.log(error)
        }

    }
}


const eventUpdated = ( event ) => {
    return {
        type: types.eventUpdated,
        payload: event
    }
}




export const eventStartDelete = ( ) => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent

        try {
            
            const resp = await fecthWithToken(`events/${ id }`, {}, 'DELETE')
            const { status, message } = await resp.json()

            if ( status ) {
                dispatch( eventDeleted() )
            } else {
                Swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error'
                })
            }

        } catch (error) {
            console.log(error)
        }

    }
}


const eventDeleted = () => {
    return {
        type: types.eventDeleted
    }
}





export const eventStartLoading = () => {

    return async (dispatch) => {


        try {
            const resp = await fecthWithToken('events')
            const { events } = await resp.json()


            dispatch( eventLoaded( prepareEvents(events) ) )
            
        } catch (error) {
            console.log(error)
        }



    }

}



const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events   
})



export const eventLogout = () => ({
    type: types.eventLogout
})