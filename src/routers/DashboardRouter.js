import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AddProductsScreen } from '../components/administration/AddProductsScreen';
import { AdministratorScreen } from '../components/administration/AdministratorScreen';
import { AllProductsScreen } from '../components/administration/AllProductsScreen';
import { DashboarScreen } from '../components/administration/DashboarScreen';
import { OrdersScreen } from '../components/administration/OrdersScreen';
import { UsersScreen } from '../components/administration/UsersScreen';
import { Menu } from '../components/ui/Menu';

export const DashboardRouter = () => {

    return (
        <>
            <Menu />
            <div className='container_app_router'>
                <Switch>
                    <Route exact path='/dashboard' component={ DashboarScreen } />
                    <Route exact path='/products' component={ AddProductsScreen } />
                    <Route exact path='/all_products' component={ AllProductsScreen } />
                    <Route exact path='/users' component={ UsersScreen } />
                    <Route exact path='/orders' component={ OrdersScreen } />
                    <Route exact path='/administrators' component={ AdministratorScreen } />

                    <Redirect to='/dashboard' />
                </Switch>
            </div>
            
        </>
    )
}
