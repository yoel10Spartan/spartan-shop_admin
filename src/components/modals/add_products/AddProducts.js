import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

import { 
    addNewProduct, 
    quitActiveProduct,  
    startUpdateProduct 
} from '../../../actions/products';
import { removeImage, removeReducerListImages } from '../../../actions/images'
import { CardPrevius } from './cardprevius/CardPrevius';
import { AddProductForm } from '../small_forms/AddProductForm';
import './AddProduct.css';

const initialState = {
    name: '',
    price: ''
}

export const AddProducts = ({ history }) => {

    const dispatch = useDispatch();
    const { product_active } = useSelector(state => state.all_products);
    const { image, list_images } = useSelector(state => state.images);

    const [coloursList, setColoursList] = useState([]);
    const [descriptionList, setDescriptionList] = useState([]);
    const [handleFree, setHandleFree] = useState( false );
    const [idProduct, setIdProduct] = useState(null);
    const [values, setFormValues] = useState(initialState);
    
    // Checking out, to edit a product or add a new one.
    useEffect(() => {        
        if( product_active !== null ){
            
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            
            const { 
                id, 
                name: nameActive, 
                description,  
                price: priceActive,
                free_shipping,
                colours_available,
            } = product_active;
            
            setFormValues({
                name: nameActive,
                price: priceActive
            });
            setColoursList( colours_available );
            setDescriptionList( description );
            setHandleFree( free_shipping );
            setIdProduct( id );

        } else {
            setFormValues( initialState );
        }

    }, [ product_active, setFormValues ]);

    // For the onChange of an input in the form, 
    // every time there is a change, the useState 
    // that is pending of the form is affected.
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const { name, price, } = values;

    const url_image_prinsipal = ( product_active !== null ) 
        ? ( product_active['url_image_prinsipal'] !== null) 
            ? product_active['url_image_prinsipal'] 
            : image
        : image;

    const images = list_images;

    const valuesUpdate = {
        name, 
        descriptionList, 
        price, 
        coloursList,
        handleFree,
        url_image_prinsipal
    };

    const handleChangeProduct = () => {

        const re_name = /^(([a-zA-Z0-9-_./])+\s*){1,8}$/;
        const re_price = /^[0-9]{1,5}$/;
        // const re_url_img = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;

        if(
            re_name.test( name.trim() ) &&
            re_price.test( price ) &&
            descriptionList.length > 0 &&
            coloursList.length > 0 &&
            url_image_prinsipal !== null &&
            list_images !== null
        ){
            Swal.fire({
                title: 'Send to production',
                text: "Are you sure about this action?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, send'
              }).then((result) => {
                    if (result.isConfirmed) {
                        valuesUpdate.images = images;
                        dispatch( addNewProduct( valuesUpdate ) );
                        dispatch( removeImage() );
                        dispatch( removeReducerListImages() );
                        history.replace('/products');
                    }
              });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The information you are submitting is invalid'
            });
        }

    }

    const handleFreeShipping = () => setHandleFree( !handleFree );

    const handleCancel = () => {
        history.replace('/products');
        dispatch( removeImage() );
        dispatch( quitActiveProduct() );
        dispatch( removeReducerListImages() );
    }

    const handleUpdateData = () => {
        history.replace('/products');
        dispatch( startUpdateProduct(idProduct, valuesUpdate) );
        dispatch( quitActiveProduct() );
    }


    return (
        <div className='container__body'>

            <div className='save__cancel'>
                {
                    ( product_active === null ) 
                        ?   <Button variant="outlined" color="primary" onClick={ handleChangeProduct }>
                                Add product
                            </Button>
                        :   <Button variant="outlined" color="primary" onClick={ handleUpdateData }>
                                Add the edit
                            </Button>
                }
                
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={ handleCancel }
                    style={{ marginLeft: '60px' }}
                >
                    Cancel
                </Button>
            </div>

            <div className='container_add_new'>
                
                <AddProductForm 
                    values={ [ name, price ] }
                    handlers={ [ handleInputChange, handleFree, handleFreeShipping ] }
                    setters={ [ setDescriptionList, setColoursList ] }
                />

                <div className='new__product__container__file'>
                    <CardPrevius 
                        list={ [coloursList, descriptionList] } 
                        setList={ [setColoursList, setDescriptionList] }
                        nameProduct={ name }
                        priceProduct={ price }
                    />
                </div>

            </div>
            
        </div>
    )
}
