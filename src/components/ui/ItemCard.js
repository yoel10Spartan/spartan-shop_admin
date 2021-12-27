import React from 'react';
import './ItemCard.css';

export const ItemCard = ({ handleList, handleSetList, icon, item_title, handleNameDelete }) => {

    const handleDelete = ( item ) => {
        handleSetList( items => items.filter( i => i !== item ) );
        if(typeof(handleNameDelete) === 'function'){
            handleNameDelete( item );
        }
    }

    return (
        <div className="list_files">
            <p className='item__title'>{ item_title }</p>
            <hr />
            <ul>
                { 
                    handleList.map( item => (
                        <div key={ item } className="item">
                            <i className={`${ icon } delete`} onClick={ () => handleDelete( item ) } ></i>
                            <li>{ item }</li>
                        </div>
                    ))
                }
            </ul>
        </div>
    ) 
}
