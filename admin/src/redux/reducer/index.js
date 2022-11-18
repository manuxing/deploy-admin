import { type } from "../actions/types";
import tools from "../../tools";

const initialState = {
    actual:1,
    actualG:{
        total:0,
        totalPages:0,
        currentPage:0,
        data:null,
        search:""
    },
    all:{
        display:[],
        stats:[],
    },
    currentUser: null,
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
    switch (action.type) {

        case type.CLEAR_ACTUALG: {
            return {
                ...state,
                actualG: {
                    total:0,
                    totalPages:0,
                    currentPage:0,
                    data:null,
                    model:null,
                }
            }
        }
        case type.DELETE: {
            let set = action.payload === false ? false : true
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
                    data:action.payload.data.data,
                    search:action.payload.data.search,
                    total:action.payload.data.total,
                    totalPages:action.payload.data.totalPages,
                    currentPage:action.payload.data.currentPage,
                }
            }
        }
        case type.ADD_NOT: {
            return {
                ...state,
                not: [...state.not, action.payload.data]
            };
        }
        
        case type.SET_CURRENTUSER: {
            return {
                ...state,
                currentUser:action.payload
            }
        }
        
        
        //set
        case type.SET_ACTUAL: {
            if(action.payload !== 1 && action.payload.data.length)action.payload.data = action.payload.data[0]
            return {
                ...state,
                actual: action.payload === 1 ? action.payload : action.payload.data
            };
        }
        case type.SET_ACTUALG: {
            action.payload.data.stat.url = Array.from(action.payload.data.stat.url).slice(0,-1).join("");
            return {
                ...state,
                actualG: {
                    total:action.payload.data.actual.total,
                    totalPages:action.payload.data.actual.totalPages,
                    currentPage:action.payload.data.actual.currentPage,
                    data:action.payload.data.actual.data,
                    model:action.payload.data.stat.url,
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



        //gets
        case type.GET_NOT: {
            return {
                ...state,
                not: action.payload.data
            };
        }
        case type.GET_ABOUT: {
            return {
                ...state,
                about: action.payload.data
            };
        }
        case type.GET_CLIENTES: {
            let {actual, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                clientes: actual.data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SOLICITUDES: {
            let {actual, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                solicitudes: actual.data,
                all:{...state.all, stats},
            };
        }
        case type.GET_ACTIVIDADES: {
            let {actual, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                actividades: actual.data,
                all:{...state.all, stats},
            };
        }
        case type.GET_REVIEWS: {
            let {actual, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                reviews: actual.data,
                all:{...state.all, stats},
            };
        }
        case type.GET_SERVICIOS: {
            let {actual, stat} = action.payload.data;
            let stats = tools.getSetter_(stat, state);
            return {
                ...state,
                servicios: actual.data,
                all:{...state.all, stats},
            };
        }

            //error
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