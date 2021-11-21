

import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const { checking, id } = useSelector(state => state.auth )

    useEffect(() => {
        dispatch( startChecking() )
    }, [ dispatch ])

    if ( checking ) {
        return (<h5>Cargando...</h5>)
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ !!id }
                    />

                    <PrivateRoute 
                        exact 
                        path="/"      
                        component={ CalendarScreen }
                        isAuthenticated={ !!id }
                    />


                    <Redirect to="/" />
                </Switch> 
            </div>
        </Router>
    )
}
