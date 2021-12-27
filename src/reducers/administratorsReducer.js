import { types } from "../types/types";

const initState = {
    administrators: [],
    administrator_active: null
}

export const administratorsReducer = ( state = initState, action ) => {
    switch ( action.type ) {

        case types.administratorsGet:
            return {
                ...state,
                administrators: action.payload
            }

        case types.administratorsSetActive:
            return {
                ...state,
                administrator_active: action.payload
            }

        case types.administratorsRemoveActive:
            return {
                ...state,
                administrator_active: null
            }

        case types.administratorsRemoveImageActive:
            state.administrator_active.url_photo = null;
            return {
                ...state,
                administrator_active: state.administrator_active
            }

        case types.administratorDelete:
            return {
                ...state,
                administrators: state.administrators.filter( admin => admin.id !== action.payload ? admin : '' )
            }

        case types.administratorUpdate:
            return {
                ...state,
                administrators: state.administrators.map( admin => {
                    if( admin.id === action.payload.id ){
                        admin.name = action.payload.name
                        admin.lastname = action.payload.lastname
                        admin.email = action.payload.email
                        admin.url_photo = action.payload.url_photo
                        return admin
                    } else { return admin }
                })

            }

        default:
            return state;
    }

}