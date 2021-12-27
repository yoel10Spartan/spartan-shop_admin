import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductId, setActiveProduct, setIdProductActive } from '../../../actions/products';


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const CardAddProducts = ({ 
    id, 
    name, 
    description, 
    price, 
    on_sale, 
    porcentage,
    offer_price,
    free_shipping,
    colours_available, 
    url_image_prinsipal,
    url_images }) => {
    
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( deleteProductId( id ) );  
    }

    const handleEditProduct = () => {
        const valuesSetUpdate = {
            id,
            name,
            description,
            price,
            free_shipping,
            colours_available,
            url_image_prinsipal,
            url_images
        };

        dispatch( setActiveProduct( valuesSetUpdate ) );
    }

    const handleAddOffer = () => {
        dispatch( setIdProductActive( id ) );
    }

    // Menu Colors
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Menu Desciption
    const [anchorEl_2, setAnchorEl_2] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = (event) => {
        setAnchorEl_2(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl_2(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl_2(null);
    };
    
    return (
        <div className="card-container">
            <div className="card-header">
                <img src={ url_image_prinsipal } alt="rover" />
            </div>
            <div className="card-body">
                { on_sale && <button className="custom-btn btn-3"><span>{ `Offer ${ porcentage }%` }</span></button>}
                <p className='name__product'>{ name }</p>

                { 
                    !on_sale 
                        ? <p>Price $ { price }</p> 
                        :   <div className='card_price_offer'>
                                <p className='price_real'>Price $ { price }</p>
                                <p className='price_offer'>Price with discount $ { offer_price }</p>
                            </div>
                }

                <div className='container__menu'>
                    <List 
                        component="nav" 
                        style={{ border: '1px solid #808B96', padding: '0', borderRadius: '5px' }} 
                    >
                        <ListItem
                            button
                            onClick={handleClickListItem}
                        >
                            <ListItemText primary="Descriptions" />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl_2}
                        keepMounted
                        open={Boolean(anchorEl_2)}
                        onClose={handleCloseMenu}
                    >
                        {description.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Button 
                        onClick={handleClick}
                        style={{ border: '1px solid #808B96', borderRadius: '5px', marginTop: '10px' }}
                    >
                        See available colors
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            colours_available.map( colour => (
                                <MenuItem key={ colour } onClick={handleClose}>{ colour }</MenuItem>
                            ))
                        }
                    </Menu>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{ margin: '10px 0 0 0' }}
                        onClick={ handleAddOffer }
                    >
                        Add offer
                    </Button>
                </div>

                <div className="user">
                    <span className='button-card' onClick={ handleEditProduct }><Link to='/add_new_product'></Link></span>
                    <span className='button-card-delete' onClick={ handleDelete } ><Link to='#'></Link></span>
                </div>
            </div>          
        </div>
    )
}
