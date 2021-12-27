import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

import { useDispatch, useSelector } from 'react-redux';
import { removeIdProductActive, startUpdateSale } from '../../../actions/products';
import { customStyles } from '../customStyles';

import Button from '@material-ui/core/Button';
import './UpdateOffer.css';

const now = moment().minutes(0).seconds(0);
const now_more_1 = moment().add(1, 'hour').toDate();

const initEvent = {
    porcentage: 0,
    date: now_more_1,
    isOffer: false
};

Modal.setAppElement('#modal_root');

export const UpdateOffer = () => {
    
    const dispatch = useDispatch();
    const { id_active } = useSelector(state => state.all_products);

    const [ dateExpiration, setDateExpiration ] = useState( now_more_1 );

    const [formValues, setFormValues] = useState( initEvent );
    let { porcentage, date, isOffer } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleDateExpiration = ( event ) => {
        setDateExpiration( event );
        setFormValues({
            ...formValues,
            date: event
        });
    }

    const handleIsOffert = () => {
        setFormValues({
            porcentage: 0,
            date: now_more_1,
            isOffer: !isOffer
        });
    }

    const closeModal = () => {
        dispatch( removeIdProductActive() ); 
    }

    const handleStartUpdate = () => {
        if( date !== 0 ){
            date = date.getTime()
        }
        const valuesUpdate = {
            on_sale: isOffer,
            porcentage,
            duration_time: date
        };
        dispatch( startUpdateSale( id_active, valuesUpdate ) );
        dispatch( removeIdProductActive() );
        setFormValues(initEvent);
    }

    return (
        <Modal
            isOpen={ !!id_active }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h2>Add offer</h2>
            <div>
                <form className='form__modal'>
                    <label> It's on sale?</label>
                    <input 
                        className='input_modal'
                        type='checkbox'
                        name='offer'
                        value={ isOffer }
                        onChange={ handleIsOffert }
                    />
                    <label> Discount rate </label>
                    <input
                        className='input_modal'
                        type='number'
                        name='porcentage' 
                        autoComplete='off'
                        required
                        value={ porcentage }
                        onChange={ handleInputChange }
                        disabled={ !isOffer }
                    />
                    <label> Expiration date </label>
                    <DateTimePicker
                        className="form-control"
                        value={ dateExpiration }
                        minDate={ now.toDate() }
                        onChange={ handleDateExpiration }
                        disabled={ !isOffer }
                    />

                    <Button 
                        variant="outlined" 
                        onClick={ handleStartUpdate }
                        color="primary" 
                        style={{ display: 'block', marginTop: '20px' }}
                    >
                        Establish
                    </Button>
                </form>
            </div>  
        </Modal>
    )
}
