import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { returnAllProducts } from '../../actions/products';
import { CardsAllProducts } from '../cards/CardsAllProducts/CardsAllProducts';

export const AllProductsScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( returnAllProducts() )
    }, [ dispatch ]);
    
    return (
        <div>
            <CardsAllProducts />
        </div>
    )
}
