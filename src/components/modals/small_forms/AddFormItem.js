import React, { useState } from 'react'
import Button from '@material-ui/core/Button';

import { useForm } from '../../../hooks/useForm';

import './AddFormItem.css';

export const AddFormItem = ({ setState, btnName, regex }) => {

    const [handleError, setHandleError] = useState(false);
    const [ values, handleInputChange, reset ] = useForm({
        item: ''
    });
    const { item } = values;

    const handleAddItem = ( event ) => {
        event.preventDefault();
        if( regex.test( item.trim() ) ){
            setState( valuesItem => [ ...valuesItem, item ] );
            setHandleError( false )
            reset();
        } else { setHandleError( true ) }
    }

    return (
        <div className='form_addFormItem'>
            <input
                className={`input_add_item ${ handleError && 'error_set'}`}
                type='text'
                name='item'
                value={ item }
                autoComplete='off'
                onChange={ handleInputChange }
            />
            <Button 
                variant="outlined" 
                color="secondary"
                style={{ marginLeft: '15px' }}
                onClick={ handleAddItem } 
            >
                Add { btnName }
            </Button>
        </div>
    )
}
