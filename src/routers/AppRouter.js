import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch
  } from 'react-router-dom';
import { chekingToken } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen'
import { AddProducts } from '../components/modals/add_products/AddProducts';
import { DashboardRouter } from './DashboardRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const { cheking, id } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( chekingToken() )
    }, [ dispatch ]);

    if( cheking ){
        return <h5>Cargando</h5>
    }

    return (
        <Router> 
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path='/login' 
                        component={ LoginScreen } 
                        isAuthenticated={ !!id }
                    />
                    <PrivateRoute
                        exact
                        path='/add_new_product' 
                        component={ AddProducts }
                        isAuthenticated={ !!id }
                    />
                    <PrivateRoute
                        path='/'
                        component={ DashboardRouter } 
                        isAuthenticated={ !!id }
                    />
                </Switch>
            </div>
        </Router>
    )
}
