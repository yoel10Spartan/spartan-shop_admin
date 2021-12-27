import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { returnAllAdministrators } from '../../actions/administrators';
import { ControllAdministrators } from '../cards/ControllAdministrators/ControllAdministrators';

export const AdministratorScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( returnAllAdministrators() );
    }, [ dispatch ])

    return (
        <div>
            <ControllAdministrators />
        </div>
    )
}
