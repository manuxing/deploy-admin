import { type } from "../actions/types";
import tools from "../../tools";

const initialState = {
    actual:1,
    actualG:null,
    all:{
        display:[],
        stats:[],
    },
    about:null,
    solicitudes: [],
    clientes: [],
    actividades: [],
    reviews: [],
    servicios: [],
    deleted: null,
    not: [],
    error: null,
    errForm: null,
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
        case type.SET_ACTUALG: {
            console.log(action.payload)
            action.payload.data.stat.url = Array.from(action.payload.data.stat.url).slice(0,-1).join("");
            return {
                ...state,
                actualG: {
                    data:action.payload.data.data,
                    model:action.payload.data.stat.url,
                }
            }
        }
        case type.CLEAR_ACTUALG: {
            return {
                ...state,
                actualG: null
            }
        }
        case type.DELETE: {
            let set = action.payload === false ? false : true
            console.log(set)
            return {
                ...state,
                deleted:set
            }
        }
        case type.SERCH: {
            return {
                ...state,
                actualG: {
                    ...state.actualG,
                    data:action.payload.data,
                }
            }
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
        case type.ADD_NOT: {
            console.log(action.payload.data)
            return {
                ...state,
                not: [...state.not, action.payload.data]
            };
        }
        case type.GET_ABOUT: {
            return {
                ...state,
                about: action.payload.data
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
            let {data, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                reviews: data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SERVICIOS: {
            let {data, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                servicios: data,
                all:{...state.all, stats},
            };
        }
        case type.ERROR:
            return {
              ...state,
              error: action.payload.response,
            }
        case type.ERROR_FORM:
            let set = action.payload !== null ? action.payload.response : action.payload
            return {
              ...state,
              errForm: set,
            }
        default:
            return {...state};
    };
};