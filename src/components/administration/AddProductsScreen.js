import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { returnProductsForID } from '../../actions/products';
import { CardsAddProducts } from '../cards/CardsAddProducts/CardsAddProducts'

export const AddProductsScreen = () => {

    const dispatch = useDispatch();
    const { id } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( returnProductsForID( id ) );
    }, [ dispatch, id ]);

    return (
        <div>
            <CardsAddProducts />
        </div>
    )
}
