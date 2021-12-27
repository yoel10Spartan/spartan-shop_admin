import React from 'react';
import './LoginScreen.css'

import { 
    handleAnimateButton, 
    handleAnimateEmail, 
    handleAnimatePassword 
} from '../../helpers/animate';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

export const LoginScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [ values, handleInputChange ] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values;

    const pathname = localStorage.getItem( 'pathname' ) || '/';

    const handleSendForm = ( event ) => {
        event.preventDefault();
        dispatch( startLogin({ email, password }) );
        history.replace( pathname );
    }

    return (
        <div>
            <div className='page'>
                <div className='container'>
                    <div className="left">
                        <div className="login"> Spartan Shop </div>
                        <div className="eula">
                            Panel for store administrators, 
                            if you do not have an access account, 
                            talk to another administrator.
                        </div>
                    </div>
                    <div className='right' style={{ background: '#11101D' }}>
                        <svg className='svg__login' viewBox='0 0 320 300' style={{ background: '#11101D' }}>
                            <defs>
                                <linearGradient id="linearGradient" x1="13" y1="193.49992" x2="307" y2="193.49992" gradientUnits="userSpaceOnUse">
                                    <stop style={{ stopColor: '#11101D' }} offset="0" id="stop876" />
                                    <stop style={{ stopColor: '#ff00ff' }} offset="0" id="stop876" />
                                </linearGradient>
                            </defs>
                            <path d='m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143' /> 
                        </svg>
                        <div className="form">
                            <label className='label_login'>Email</label>
                            <form onSubmit={ handleSendForm }>
                                <input
                                    className='login_input'
                                    type="email" 
                                    id="email" 
                                    autoComplete='off'
                                    name='email' 
                                    value={ email }
                                    onFocus={ handleAnimateEmail }
                                    onChange={ handleInputChange } 
                                />
                                <label className='label_login'>Password</label> 
                                <input
                                    className='login_input'
                                    type="password" 
                                    id="password" 
                                    name='password'
                                    value={ password }
                                    onFocus={ handleAnimatePassword }
                                    onChange={ handleInputChange } 
                                />
                                <input
                                    className='login_input'
                                    type="submit" 
                                    id="submit" 
                                    value="Submit" 
                                    onFocus={ handleAnimateButton }
                                    onChange={ handleInputChange }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

