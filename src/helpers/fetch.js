const url_data = process.env.REACT_APP_API_URL;
const url_image = process.env.REACT_APP_IMAGE_URL;

export const fetchLogin = ( endPoint, data, method ) => {
    const url = `${url_data}${endPoint}`;
    const form_data = new FormData();
    form_data.append( 'email', data.email );
    form_data.append( 'password', data.password );
    
    return fetch( url, {
        method,
        body: form_data
    });
}

export const fetchWithToken = ( endPoint, method ) => {
    const url = `${url_data}${endPoint}`;
    const token = localStorage.getItem('token') || '';
    return fetch( url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'token_validate': token
        }
    });
}

export const fetchWithTokenAndData = ( endPoint, method, data ) => {
    const url = `${url_data}${endPoint}`;
    const token = localStorage.getItem('token') || '';
    return fetch( url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
            'token_validate': token
        },
        body: JSON.stringify( data )
    });
}

export const fetchForImage = ( endPoint, img, key_form_data ) => {
    const url = `${url_image}${endPoint}`;
    const formData = new FormData();

    if( Array.isArray( img ) ){
        for(let i of img){
            formData.append(key_form_data, i);
        }
    } else {
        formData.append(key_form_data, img);
    }

    return fetch( url, {
        method: 'POST',
        body: formData
    });
}