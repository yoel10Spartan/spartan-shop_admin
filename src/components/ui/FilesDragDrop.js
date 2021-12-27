import React, { useEffect, useState } from 'react';
import { ItemCard } from './ItemCard';
import './FilesDragDrop.css';

import Button from '@material-ui/core/Button';
import { uploadListImages } from '../../actions/images';
import { useDispatch, useSelector } from 'react-redux';

export const FilesDragDrop = () => {

    const dispatch = useDispatch();
    const { list_images } = useSelector(state => state.images);
    const [files, setFiles] = useState([]);

    const handleUpload = () => {
        const inputFile = document.getElementById('file_list');
        inputFile.click();
    }

    const handleSetFiles = ( event ) => {
        setFiles( [ ...files, ...event.target.files ] );
    }

    const [disabledError, setDisabledError] = useState( false );
    const [fileName, setFileName] = useState([]);
    useEffect(() => {
        files.length > 4 ? setDisabledError( true ) : setDisabledError( false )
        setFileName( files.map( file => file.name ) );    
    }, [files])

    const handleNameDelete = ( name ) => {
        const filesNew = files.filter( file => (
            file.name !== name ? file : ''
        ));
        setFiles( filesNew );
    }

    const handleAddListImages = () => {
        dispatch( uploadListImages( files ) );
    }

    return (
        <div className='upload_images'>
            <div className='container__btns'>
                <div 
                    className={ `drag_drop ${ disabledError && 'error__image' }` } 
                    onClick={ handleUpload }
                >
                    <i className='bx bx-cloud-upload' ></i>
                    { disabledError ? 'Only 5 images' : 'Click to upload images' }
                </div>
                <Button 
                        variant="outlined" 
                        color="primary"
                        style={{ padding: '0', width: '110px', marginTop: '10px' }}
                        disabled={ files.length <= 0 || list_images !== null }
                        onClick={ handleAddListImages }
                    >
                        Add Images
                </Button>
            </div>
            <div className="list_name__files">
                <input 
                    type='file' 
                    multiple 
                    id="file_list" 
                    disabled={ disabledError } 
                    onChange={ handleSetFiles }     
                />
            </div>
            <ItemCard 
                handleList={ fileName }
                handleSetList={ setFileName }
                icon='bx bxs-trash-alt'
                item_title='Images'
                handleNameDelete={ handleNameDelete } />
        </div>
    )
}
