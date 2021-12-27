import React from 'react';
import './SearchButton.css';

export const SearchButton = React.memo(({ text, handleInputChange, name }) => {

    const handleDeleteSubmit = ( event ) => {
        event.preventDefault();
    }

    return (
        <div id="wrap">
            <p style={{ fontSize: '30px' }} className='p_title'>{ text }</p>
            <form onSubmit={ handleDeleteSubmit }>
                <input 
                    id="search" 
                    type="text" 
                    autoComplete='off' 
                    placeholder="What are you looking for?"
                    name={ name }
                    onChange={ handleInputChange }    
                />
                <input id="search_submit" value="Rechercher" type="submit" />
            </form>
        </div>
    )
})
