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
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all.stats;
            stats = {...stats, [stat.name]:stat.vals};
            return {
                ...state,
                clientes: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SOLICITUDES: {
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all.stats;
            stats = {...stats, [stat.name]:stat.vals};
            return {
                ...state,
                solicitudes: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_ACTIVIDADES: {
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all.stats;
            stats = {...stats, [stat.name]:stat.vals};
            return {
                ...state,
                actividades: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_REVIEWS: {
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all.stats;
            stats = {...stats, [stat.name]:stat.vals};
            return {
                ...state,
                reviews: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SERVICIOS: {
            let stat = action.payload.data.pop();
            let data = action.payload.data;
            let stats = state.all.stats;
            stats = {...stats, [stat.name]:stat.vals};
            return {
                ...state,
                servicios: data,
                all:{...state.all, stats},
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