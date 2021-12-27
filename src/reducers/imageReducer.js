import { types } from "../types/types";

const initState = {
    image: null,
    list_images: null
}

export const imageReducer = ( state = initState, action ) => {
    switch ( action.type ) {

        case types.imageAdd:
            return {
                ...state,
                image: action.payload
            }

        case types.imageRemove:
            return {
                ...state,
                image: null
            }

        case types.imagesSetList:
            return {
                ...state,
                list_images: action.payload
            }

        case types.imagesRemoveList:
            return {
                ...state,
                list_images: null
            }

        default:
            return state;
    }

}