import React from 'react';
import { useSelector } from 'react-redux'; 
import { SearchButton } from '../../ui/SearchButton';
import { CardAddProducts } from './CardAddProducts';
import { useForm } from '../../../hooks/useForm';
import './CardAddProducts.css';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { UpdateOffer } from '../../modals/update_offer/UpdateOffer';

export const CardsAddProducts = () => {

    const { products_for_id } = useSelector(state => state.all_products);
    const [ values, handleInputChange ] = useForm({ word: '' });
    const { word } = values;
    const productsFilter = products_for_id.filter( product => (
        product.name.toLowerCase().includes( word.toLowerCase().trim() ) ? product : ''
    ));

    return ( 
        <div>
            <SearchButton 
                text='Add Products'
                name={ 'word' }
                handleInputChange={ handleInputChange }
            />
            <Link to='/add_new_product' style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary" style={{ margin: '-15px 0 0 10px' }}>
                    add new
                </Button>
            </Link>
            <div className="container-card">
                {
                    productsFilter.map( product => (
                        <CardAddProducts key={ product.id } { ...product } />
                    ))
                }
            </div>
            <UpdateOffer />
        </div>
    )
}


