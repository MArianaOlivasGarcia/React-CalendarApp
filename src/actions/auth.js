import Swal from 'sweetalert2'
import { fecthWithoutToken, fecthWithToken } from '../helpers/fetch'
import { types } from '../types/types'
import { eventLogout } from './events'

export const startLogin = ( email, password ) => {

    return async ( dispatch ) => {

        const resp = await fecthWithoutToken( 'auth/login', { email, password }, 'POST' )
        const { status, token, user, message } = await resp.json() // body

        if ( status ) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login( { id: user.id, name: user.name } ) )

        } else {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error'
            })
        }

    }

}




export const startRegister = ( name, email, password ) => {

    return async ( dispatch ) => {

        const resp = await fecthWithoutToken( 'auth/register', { name, email, password }, 'POST' )
        const { status, token, user, message } = await resp.json() // body

        if ( status ) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login( { id: user.id, name: user.name } ) )

        } else {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error'
            })
        }

    }

}




export const startChecking = () => {
    return async ( dispatch ) => {

        const resp = await fecthWithToken( 'auth/renew' )
        const { status, token, user, message } = await resp.json() // body


        if ( status ) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login( { id: user.id, name: user.name } ) )

        } else {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error'
            })

            dispatch( checkingFinish() )
        }

    }
}


const checkingFinish = () => ({
    type: types.authCheckingFinish
})


const login = ( user ) => ({
        type: types.authLogin,
        payload: user  
})



export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear()
        dispatch( eventLogout() )
        dispatch( logout() )

    }
}


const logout = () => ({
    type: types.authLogout
})

