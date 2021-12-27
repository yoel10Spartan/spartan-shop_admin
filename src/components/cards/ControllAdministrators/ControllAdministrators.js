import React from 'react'
import { useForm } from '../../../hooks/useForm';
import { SearchButton } from '../../ui/SearchButton';
import { ContainerCardsAdministrators } from './ContainerCardsAdministrators';

export const ControllAdministrators = () => {

    const [ values, handleInputChange ] = useForm({ word: '' });
    const { word } = values;

    return (
        <div>
            <SearchButton 
                text='Add Administrators'
                name='word'
                handleInputChange={ handleInputChange }
            />
            <ContainerCardsAdministrators />    
        </div>
    )
}
