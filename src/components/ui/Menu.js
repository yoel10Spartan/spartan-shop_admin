import React, { useState } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Menu = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleStartExit = () => {
        dispatch( startLogout() );
    }

    const [btnOpen, setBtnOpen] = useState(true);
    const handleIcon = () => btnOpen ? setBtnOpen(false) : setBtnOpen(true);

    return (
        <div className={ btnOpen ? 'sidebar close' : 'sidebar open' } >
            <div className="logo-details">
            <i className='bx bxl-python icon'></i>
                <div className="logo_name">Spartan</div>
                <i 
                    className={ btnOpen ? `bx bx-menu` : 'bx bx-chevron-left' } 
                    id="btn" 
                    onClick={ handleIcon } 
                ></i>
            </div>
            <ul className="nav-list">
                
                <li>
                    <Link to='/dashboard'>
                        <i className='bx bx-grid-alt'></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                    <span className="tooltip">Dashboard</span>
                </li>
                <li>
                    <Link to='/products'>
                        <i className='bx bx-box' ></i>
                        <span className="links_name">Added Products</span>
                    </Link>
                    <span className="tooltip">Added Products</span>
                </li>
                <li>
                    <Link to='/all_products'>
                        <i className='bx bxs-box' ></i>
                        <span className="links_name">All the Products</span>
                    </Link>
                    <span className="tooltip">All the Products</span>
                </li>
                <li>
                    <Link to='/users'>
                        <i className='bx bx-user' ></i>
                        <span className="links_name">Users</span>
                    </Link>
                    <span className="tooltip">Users</span>
                </li>
                <li>
                    <Link to='/orders'>
                        <i className='bx bx-cart-alt' ></i>
                        <span className="links_name">Orders</span>
                    </Link>
                    <span className="tooltip">Orders</span>
                </li>
                <li>
                    <Link to='/administrators'>
                        <i className='bx bx-user-plus' ></i>
                        <span className="links_name">Administrators</span>
                    </Link>
                    <span className="tooltip">Administrators</span>
                </li>
                
                <li className="profile" onClick={ handleStartExit } >
                    <div className="profile-details">
                    <div className="name_job">
                        <div className="name">{ name }</div>
                        <div className="job">Administrator</div>
                    </div>
                    </div>
                    <i className='bx bx-log-out' id="log_out" ></i>
                </li>
            </ul>
        </div>
    )
}
