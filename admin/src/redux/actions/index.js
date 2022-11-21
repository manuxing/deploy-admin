import { type } from "./types";
import axios from "axios";

export function search(querys, to, page, ord) {
  return function (dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}${to}/search/?query=${querys}&page=${page}&ord=${ord}`)
      .then((res) => {
        dispatch({ type: type.SERCH, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function changePage(page, to){
  return function changePage(dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}${to}/?page=${page}`)
      .then((res) => {
        dispatch({ type: type.SET_ACTUALG, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR, payload: e });
      });
  };
}

export function createClient(data) {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_URL}client/`, data)
      .then((res) => {
        dispatch({ type: type.SET_ACTUAL, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
} 

export function getClient(id) {
  if (id) {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}client/${id}`)
        .then((res) => {
          dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}data/client/`)
        .then((res) => {
          dispatch({ type: type.GET_CLIENTES, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function getNot(id) {
  return function (dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}notif/`)
      .then((res) => {
        dispatch({ type: type.GET_NOT, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "ERROR", payload: e });
      });
  };
}

export function deleteModel(model ,id) {
  return function (dispatch) {
    axios
      .delete(` ${process.env.REACT_APP_API_URL}${model}/${id}`)
      .then((res) => {
        dispatch({ type: type.DELETE, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "ERROR", payload: e });
      });
  };
}

export function getAbout() {
  return function (dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}about/`)
      .then((res) => {
        dispatch({ type: type.GET_ABOUT, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "ERROR", payload: e });
      });
  };
}

export function putAbout(data) {
  return function (dispatch) {
    axios
      .put(` ${process.env.REACT_APP_API_URL}about/`, data)
      .then((res) => {
        dispatch({ type: type.GET_ABOUT, payload: res });
      })
      .catch((e) => {
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function createSolicitud(data) {
  return function (dispatch) {
    axios
      .post(` ${process.env.REACT_APP_API_URL}request/`, data)
      .then((res) => {
        return { type: type.SET_ACTUAL, payload: res };
      })
      .then((p) => {
        dispatch(p);
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function getSolicitudes(id) {
  if (id) {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}request/${id}`)
        .then((res) => {
          dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}request/`)
        .then((res) => {
          dispatch({ type: type.GET_SOLICITUDES, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function createActividades(data) {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_URL}activity/`, data)
      .then((res) => {
        return { type: type.SET_ACTUAL, payload: res };
      })
      .then((p) => {
        dispatch(p);
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function getActividades(id) {
  if (id) {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}activity/${id}`)
        .then((res) => {
          dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}activity/`)
        .then((res) => {
          dispatch({ type: type.GET_ACTIVIDADES, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function createReviews(data) {
  return function (dispatch) {
    axios
      .post(` ${process.env.REACT_APP_API_URL}review/`, data)
      .then((res) => {
        return { type: type.SET_ACTUAL, payload: res };
      })
      .then((p) => {
        dispatch(p);
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function getReviews(id) {
  if (id) {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}review/${id}`)
        .then((res) => {
          dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}review/`)
        .then((res) => {
          dispatch({ type: type.GET_REVIEWS, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function createServicio(data) {
  return function (dispatch) {
    axios
      .post(` ${process.env.REACT_APP_API_URL}service/`, data)
      .then((res) => {
        return { type: type.SET_ACTUAL, payload: res };
      })
      .then((p) => {
        dispatch(p);
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function updateServicio(data) {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API_URL}service/`, data)
      .then((res) => {
        return { type: type.SET_ACTUAL, payload: {...res, data:{...res.data, updated:true}}};
      })
      .then((p) => {
        dispatch(p);
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function getServicio(id) {
  if (id) {
    return function (dispatch) {
      console.log(` ${process.env.REACT_APP_API_URL}service/${id}/`)
      axios
        .get(` ${process.env.REACT_APP_API_URL}service/${id}/`)
        .then((res) => {
          dispatch({ type: type.SET_ACTUAL, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .get(` ${process.env.REACT_APP_API_URL}data/service/`)
        .then((res) => {
          dispatch({ type: type.GET_SERVICIOS, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function statChange(x) {
  if (x.type === "Review") {
    return function (dispatch) {
      axios
        .put(` ${process.env.REACT_APP_API_URL}review/`, x.pack)
        .then((res) => {
          dispatch({ type: type.ADD_NOT, payload: res });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  } else {
    return function (dispatch) {
      axios
        .put(` ${process.env.REACT_APP_API_URL}request/`, x.pack)
        .catch((e) => {
          console.log(e);
          dispatch({ type: "ERROR", payload: e });
        });
    };
  }
}

export function setAll() {
  return function (dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}all/`)
      .then((res) => {
        dispatch({ type: type.SET_ALL, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "ERROR", payload: e });
      });
  };
}

export function setActual() {
  return { type: type.SET_ACTUAL, payload: 1 };
}

export function setActualG(to) {
  return function (dispatch) {
    axios
      .get(` ${process.env.REACT_APP_API_URL}${to}/`)
      .then((res) => {
        dispatch({ type: type.SET_ACTUALG, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function setCurrentUser(user) {
  return { type: type.SET_CURRENTUSER, payload: user };
}

export function clearActualG(to) {
  return { type: type.CLEAR_ACTUALG, payload: null };
}

export function setDeleted() {
  return { type: type.DELETE, payload: false };
}

export function error() {
  return { type: type.ERROR, payload: null };
}

export function errorForm() {
  return { type: type.ERROR_FORM, payload: null };
}

export function clearAll() {
  return { type: type.CLEAR_ALL };
}

export function orderByN(n) {
  return { type: type.ORDER_N, payload: n };
}

export function all() {
  return { type: "ALL" };
}
