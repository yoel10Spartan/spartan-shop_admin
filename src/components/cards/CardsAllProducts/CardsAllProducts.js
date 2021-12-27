import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { CardAllProducts } from './CardAllProducts';
import { SearchButton } from '../../ui/SearchButton';
import './CardsAllProducts.css';

export const CardsAllProducts = () => {

    const { products_all } = useSelector(state => state.all_products);

    // Search button
    const [ values, handleInputChange ] = useForm({ word: '' });
    const { word } = values;
    const newProductos = products_all.filter( product => (
        product.name.toLowerCase().includes( word.toLowerCase().trim()  ) ? product : ''
    ));
    
    return (
        <div>
            <SearchButton 
                text='All products added'
                name={ 'word' }
                handleInputChange={ handleInputChange }
            />
            <ul className="cards">
                { newProductos.map( product => (
                    <CardAllProducts key={ product.id } { ...product } />
                )) }
            </ul>
        </div>
    )
}
