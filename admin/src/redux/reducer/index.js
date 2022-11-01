import { type } from "../actions/types";
import tools from "../../tools";

const initialState = {
    actual:1,
    actualG:{},
    all:{
        display:[],
        stats:[],
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
            let {display} = action.payload.data;
            return {
                ...state,
                all: {...state.all, display},
            };
        }
        case type.GET_NOT: {
            return {
                ...state,
                not: action.payload.data
            };
        }
        case type.GET_CLIENTES: {
            let {data, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                clientes: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SOLICITUDES: {
            let {data, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                solicitudes: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_ACTIVIDADES: {
            let {data, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                actividades: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_REVIEWS: {
            let {data, stats} = tools.getSetter(action.payload.data, state)
            return {
                ...state,
                reviews: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SERVICIOS: {
            let {data, stats} = tools.getSetter(action.payload.data, state)
            return {
                ...state,
                servicios: data,
                all:{...state.all, stats},
            };
        }
        case type.CLEAR_ALL:
            return {
                actual:1,
                actualG:{},
                all:{
                    display:[],
                    stats:[],
                },
                solicitudes: [],
                clientes: [],
                actividades: [],
                reviews: [],
                servicios: [],
                not: [],
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