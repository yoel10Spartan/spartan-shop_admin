import React from 'react';
import { useSelector } from 'react-redux';

import { DragDrop } from '../../../ui/DragDrop';
import { FilesDragDrop } from '../../../ui/FilesDragDrop';
import { ItemCard } from '../../../ui/ItemCard';
import { removeImageProductActive } from '../../../../actions/images';

import './CardPrevius.css';

export const CardPrevius = ({ list, setList, nameProduct, priceProduct }) => {
    
    const { product_active } = useSelector(state => state.all_products);

    const [ coloursList, descriptionList ] = list;
    const [ setColoursList, setDescriptionList ] = setList;
    
    return (
        <div>
            <div className='card__container_previus'>
                <div>
                    <DragDrop 
                        element_active={ product_active }
                        remove_actvive_element={ removeImageProductActive }
                        element_to_extract='url_image_prinsipal'
                    />
                </div>
                <div className='card_previus__body'>
                    <p className='name__price' > { nameProduct } </p>
                    <p className='price'>$ { priceProduct }</p>
                    <div className='list_container'>
                        <ItemCard 
                            handleList={ coloursList } 
                            handleSetList={ setColoursList } 
                            icon='bx bxs-trash'  
                            item_title='Colors'
                        />
                        <ItemCard
                            handleList={ descriptionList } 
                            handleSetList={ setDescriptionList } 
                            icon='bx bxs-trash'
                            item_title='Description' 
                        />
                    </div>
                    <div className='files_drag-drop'>
                        {
                            ( product_active === null ) 
                                ? <FilesDragDrop/>
                                : 'You cannot edit these images at the moment, sorry.'              
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
