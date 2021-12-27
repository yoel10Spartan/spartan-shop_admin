import React from 'react';
import { useSelector } from 'react-redux';
import { AddFormItem } from './AddFormItem';

import './AddProductForm.css';

export const AddProductForm = ({ values, handlers, setters }) => {
    
    const { product_active } = useSelector(state => state.all_products);

    const [ name, price ] = values;
    const [ handleInputChange, handleFree, handleFreeShipping ] = handlers;
    const [ setDescriptionList, setColoursList ] = setters;

    return (
        <div className='new__product__container__form'>
            <p className='p_title'>
                    { 
                        ( product_active === null ) 
                            ? 'Add a new product' 
                            : 'Update this product' 
                    }
            </p>          
            <form>
                <label> Product name </label>
                <input 
                    type='text' 
                    name='name' 
                    autoComplete='off'
                    required
                    value={ name }
                    onChange={ handleInputChange }
                />

                <label> Product description </label>
                <AddFormItem 
                    setState={ setDescriptionList } 
                    btnName='Description' 
                    regex={ /^(([a-zA-Z0-9:-_])+\s*){1,8}$/ }    
                />

                <label> Price of the product </label>
                <input 
                    type='number'
                    name='price'
                    required
                    value={ price }
                    onChange={ handleInputChange }
                />

                <label> Is shipping free? </label>
                <input 
                    type='checkbox'
                    name='offer'
                    checked={ handleFree }
                    onChange={ handleFreeShipping }
                />

                <label> Add available colors </label>
                <AddFormItem 
                    setState={ setColoursList } 
                    btnName='Color' 
                    regex={ /^(([a-zA-Z0-9:-_])+\s*){1,3}$/ }
                />
            </form>               
        </div>
    )
}
