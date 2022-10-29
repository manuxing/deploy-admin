import { type } from "../actions/types";

const initialState = {
    actual:1,
    actualG:{},
    all:{
        display:[],
        stats:{},
    },
    solicitudes: [],
    clientes: [],
    actividades: [],
    reviews: [],
    servicios: [],
    not: [],
    error:{},
};

export default function rootReducer(state=initialState, action){
    console.log("mira",action.type,action.payload)
    switch (action.type) {
        case type.SET_ACTUAL: {
            if(action.payload !== 1 && action.payload.data.length)action.payload.data = action.payload.data[0]
            return {
                ...state,
                actual: action.payload === 1 ? action.payload : action.payload.data
            };
        }
        case type.SET_ALL: {
            return {
                ...state,
                all: action.payload.data,
            };
        }
        case type.GET_NOT: {
            return {
                ...state,
                not: action.payload.data
            };
        }
        case type.GET_CLIENTES: {
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all;
            stats = {...state.all, [stat.name]:stat.vals};
            console.log(stat, data[data.length-1]);
            return {
                ...state,
                clientes: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SOLICITUDES: {
            return {
                ...state,
                solicitudes: action.payload.data
            };
        }
        case type.GET_ACTIVIDADES: {
            return {
                ...state,
                actividades: action.payload.data
            };
        }
        case type.GET_REVIEWS: {
            return {
                ...state,
                reviews: action.payload.data
            };
        }
        case type.GET_SERVICIOS: {
            return {
                ...state,
                servicios: action.payload.data
            };
        }
        case type.CLEAR_ALL:
            return {
              ...state,
                actual:1,
                actualG:{},
                solicitudes: [],
                clientes: [],
                actividades: [],
                reviews: [],
                servicios: [],
                error:{},
            }
        case type.ERROR:
            return {
              ...state,
              error: action.payload,
            }
        default:
            return {...state};
    };
};