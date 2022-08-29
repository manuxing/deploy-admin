import { type } from "../actions/types";

const initialState = {
    actual:{},
    solicitudes: [],
    clientes: [],
    actividades: [],
    reviews: [],
    servicios: [],
    error:{},
};

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case type.GET_CLIENTES: {
            return {
                ...state,
                clientes: [action.payload]
            };
        }
        case type.GET_CLIENTE: {
            return {
                ...state,
                actual: [action.payload]
            };
        }
        case type.GET_SOLICITUD: {
            return {
                ...state,
                actual: [action.payload]
            };
        }
        case type.GET_SOLICITUDES: {
            return {
                ...state,
                solicitudes: [action.payload]
            };
        }
        case type.GET_ACTIVIDAD: {
            return {
                ...state,
                actual: [action.payload]
            };
        }
        case type.GET_ACTIVIDADES: {
            return {
                ...state,
                actividades: [action.payload]
            };
        }
        case type.GET_REVIEW: {
            return {
                ...state,
                actual: [action.payload]
            };
        }
        case type.GET_REVIEWS: {
            return {
                ...state,
                reviews: [action.payload]
            };
        }
        case type.GET_SERVICIO: {
            return {
                ...state,
                actual: [action.payload]
            };
        }
        case type.GET_SERVICIOS: {
            return {
                ...state,
                reviews: [action.payload]
            };
        }
        case 'ERROR': {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
            return {...state};
    };
};