import { types } from "../types/types";

const initState = {
    cheking: true,
    id: null,
    name: null,
    email: null
}

export const authReducer = ( state = initState, action ) => {
    switch ( action.type ) {

        case types.authStartLogin:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                cheking: false,
            }

        case types.authStartExit:
            return {
                ...state,
                cheking: false,
                id: null,
                name: null,
                email: null
            }
    

        default:
            return state;
    }

}