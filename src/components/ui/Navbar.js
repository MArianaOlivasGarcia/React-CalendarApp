import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'

export const Navbar = () => {

    const { name} = useSelector(state => state.auth )

    const dispatch = useDispatch()

    const hangleLogout = () => {
        dispatch( startLogout() )
    }

    return (
        <div className="p-2 navbar navbar-dark bg-dark mb-4">
                <span className="navbar-brand">{ name }</span>

                <button className="btn btn-outline-danger"
                    onClick={ hangleLogout }>
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
        </div>
    )
}
