import { type } from "./types";
import axios from "axios";

export function createClient(data){
    return function(dispatch){
        console.log(data);
        axios.post('http://localhost:3001/client/', data)
        .then((res) => {
            console.log(res);
            dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getClient(id){
    if(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/client/${id}`)
            .then((res) => {
                    dispatch({ type: type.SET_ACTUAL, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        return function(dispatch){
            axios.get(`http://localhost:3001/client/`)
            .then((res) => {
                    dispatch({ type: type.GET_CLIENTES, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    };
};

export function getNot(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/notif/`)
            .then((res) => {
                    dispatch({ type: type.GET_NOT, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
};

export function createSolicitud(data){
    return function(dispatch){
        axios.post('http://localhost:3001/request/', data)
        .then((res) => {
            return {type: type.SET_ACTUAL, payload: res};
        })
        .then(p => {
            dispatch(p);
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getSolicitudes(id){
    if(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/request/${id}`)
            .then((res) => {
                console.log("res",res)
                    dispatch({ type: type.SET_ACTUAL, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        return function(dispatch){
            axios.get(`http://localhost:3001/request/`)
            .then((res) => {
                    dispatch({ type: type.GET_SOLICITUDES, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    }; 
};

export function createActividades(data){
    return function(dispatch){
        console.log("por enviar",data);
        axios.post('http://localhost:3001/activity/', data)
        .then((res) => {
            console.log(res);
            return {type: type.SET_ACTUAL, payload: res};
        })
        .then(p => {
            dispatch(p);
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getActividades(id){
    if(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/activity/${id}`)
            .then((res) => {
                    dispatch({ type: type.SET_ACTUAL, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        return function(dispatch){
            axios.get(`http://localhost:3001/activity/`)
            .then((res) => {
                    console.log(res);
                    dispatch({ type: type.GET_ACTIVIDADES, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    }; 
};

export function createReviews(data){
    return function(dispatch){
        axios.post('http://localhost:3001/review/', data)
        .then((res) => {
            console.log(res);
            return {type: type.SET_ACTUAL, payload: res};
        })
        .then(p => {
            dispatch(p);
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getReviews(id){
    if(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/review/${id}`)
            .then((res) => {
                    dispatch({ type: type.SET_ACTUAL, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        return function(dispatch){
            axios.get(`http://localhost:3001/review/`)
            .then((res) => {
                    dispatch({ type: type.GET_REVIEWS, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    }; 
};

export function createServicio(data){
    console.log("antes de enviar", data);
    return function(dispatch){
        axios.post('http://localhost:3001/service/', data)
        .then((res) => {
            return {type: type.SET_ACTUAL, payload: res};
        })
        .then(p => {
            dispatch(p);
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getServicio(id){
    if(id){
            return function(dispatch){
                axios.get(`http://localhost:3001/service/${id}`)
                .then((res) => {
                    dispatch({ type: type.SET_ACTUAL, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
                });
            };
        } else {
            return function(dispatch){
                axios.get(`http://localhost:3001/service/`)
                .then((res) => {
                    dispatch({ type: type.GET_SERVICIOS, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    }; 
};

export function statChange(x){
    if(x.type === "Review"){
        return function(dispatch){
            axios.put(`http://localhost:3001/review/`, x.pack)
            .then((res) => {
                    console.log(res);
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        return function(dispatch){
            axios.put(`http://localhost:3001/request/`, x.pack)
            .then((res) => {
                    console.log(res);
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    }; 
};

export function setActual (){
    return { type:type.SET_ACTUAL, payload:1 };
};

export function clear (){
    return { type:type.CLEAR_ALL };
};

export function orderByR (n){
    return { type:type.ORDER_N, payload:n };
};

export function search(payload) {
    return { type: 'SEARCH', payload };
};

export function all() {
    return { type: 'ALL' };
};