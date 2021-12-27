import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, removeImage } from '../../actions/images'

import Button from '@material-ui/core/Button';
import './DragDrop.css';

export const DragDrop = ({ element_active, remove_actvive_element, element_to_extract }) => {

    const dispatch = useDispatch();
    const { image } = useSelector(state => state.images);

    const [dragOver, setDragOver] = useState( false );
    const [imageURL, setImageURL] = useState( null );
    const [invalid, setInvalid] = useState( true );
    const [imageBinary, setImageBinary] = useState( null );

    const handleDragOver = ( event ) => {
        event.preventDefault();
        setDragOver( true );
    }
    
    const handleDragLeave = ( event ) => {
        setDragOver( false );
    }

    const handleDrop = ( event ) => {
        event.preventDefault();
        const img = event.dataTransfer.files[0];
        const type = img.type;

        if (
            type === "image/jpg" ||
            type === "image/jpeg" ||
            type === "image/png"
        ) {
            setImageBinary( img );
            upload( img );
        } else {
            setInvalid( false );
        }
    }

    const upload = ( image ) => {
        const reader = new FileReader();
        reader.readAsDataURL( image );
        reader.onload = ( event ) => {
            event.preventDefault();
            setImageURL( event.target.result );
        }
    }

    const handleDeleteImage = () => {
        setImageURL( null );
        if(element_active !== null){
            dispatch( remove_actvive_element() ) 
        } 
        dispatch( removeImage() );
    }

    const handleUploadImage = () => {
        dispatch( uploadImage( imageBinary ) );
    }

    return (
        <div style={{ display:'flex', flexDirection:'column' }}>
            <div 
                className={`droparea ${ dragOver && 'hover' }`}
                onDrop={ handleDrop }
                onDragOver={ handleDragOver }
                onDragLeave={ handleDragLeave }        
            >
                {
                    (element_active !== null && element_active[element_to_extract] !== null )
                        ? <img src={ element_active[element_to_extract] } alt='imagen' className='img__dragdrop' />
                        : (
                            imageURL 
                                ? <img src={ imageURL} alt='imagen' className='img__dragdrop' /> 
                                : ( invalid ? 'Drop the Image Here' : 'Valid jpg and jpeg formats' ) 
                        )
                }       
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={ handleUploadImage }  
                    style={{ marginTop: '10px', margin: '10px 10px 0 10px', padding: '0'  }}
                    disabled={ imageURL ? ( image ? true : false ) : true }
                >
                    Add
                </Button>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={ handleDeleteImage }
                    style={{ marginTop: '10px', margin: '10px 10px 0 10px', padding: '0' }}
                    disabled={ imageURL || element_active ? ( image ? true : false ) : true }
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
