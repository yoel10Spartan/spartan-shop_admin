import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAddProductSlider } from '../../../actions/products';

// http://127.0.1.1:5000/product/add/slider/21748913

export const CardAllProducts = ({ 
        id, 
        id_administrator, 
        name, 
        price, on_sale, 
        url_image_prinsipal, 
        number_sales, 
        name_administrator,
        lastname_administrator,
        url_photo_administrator,
        product_slider
    }) => {

    const dispatch = useDispatch();
    const [checkSlider, setCheckSlider] = useState( product_slider );

    const { id:idAuth } = useSelector(state => state.auth)
    let colorAdministrator = true;
    idAuth === id_administrator ? colorAdministrator='color_admin' : colorAdministrator=''

    const handleChangeCheck = () => {
        setCheckSlider( !checkSlider );
        dispatch( startAddProductSlider( id ) );
    }

    return (
        <li>
            <div className={`card ${ colorAdministrator }`}>
                <div className='card_container_img'>
                    <img src={ url_image_prinsipal } className="card__image" alt="" />
                </div>
                <div className="card__overlay">
                    <div className={`card__header`}>
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                        <div className="card__header-text">
                            <h3 className="card__title">{ name }</h3>
                            <div className='card__price__offert'>
                                <span className="card__tagline">$ { price }</span>
                                { on_sale && <span className='offert'>Offert</span> }            
                            </div>
                            <span className="card__status">Number of sales: { number_sales }</span>
                            <div className='check_add_slider'>
                                <label>Add to slider</label>
                                <input 
                                    type='checkbox' 
                                    checked={ checkSlider } 
                                    onChange={ handleChangeCheck }    
                                />
                            </div>
                        </div>
                    </div>
                    <div className='product_inf_user background_admin'>
                        {
                            !!name_administrator ? <img alt={name_administrator} src={ url_photo_administrator } className='img_administrator_product' /> : '' 
                        }
                        {
                            !!name_administrator 
                                ? <p className='name_administrator_product'>{ name_administrator } { lastname_administrator }</p>
                                : <p className='removed_user'> The administrator who adds this article has already been removed </p>
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}
