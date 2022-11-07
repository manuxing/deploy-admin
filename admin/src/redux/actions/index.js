import { type } from "./types";
import axios from "axios";

export function search(querys, to) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/${to}/search/query?=${querys}`)
      .then((res) => {
        dispatch({ type: type.SERCH, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function createClient(data) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/client/", data)
      .then((res) => {
        console.log(res);
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
        .get(`http://localhost:3001/client/${id}`)
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
        .get(`http://localhost:3001/client/`)
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
      .get(`http://localhost:3001/notif/`)
      .then((res) => {
        dispatch({ type: type.GET_NOT, payload: res });
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
      .get(`http://localhost:3001/about/`)
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
      .put(`http://localhost:3001/about/`, data)
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
      .post("http://localhost:3001/request/", data)
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
        .get(`http://localhost:3001/request/${id}`)
        .then((res) => {
          console.log("res", res);
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
        .get(`http://localhost:3001/request/`)
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
      .post("http://localhost:3001/activity/", data)
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
    console.log(id)
    return function (dispatch) {
      axios
        .get(`http://localhost:3001/activity/${id}`)
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
        .get(`http://localhost:3001/activity/`)
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
      .post("http://localhost:3001/review/", data)
      .then((res) => {
        console.log(res);
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
        .get(`http://localhost:3001/review/${id}`)
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
        .get(`http://localhost:3001/review/`)
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
      .post("http://localhost:3001/service/", data)
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

export function getServicio(id) {
  if (id) {
    return function (dispatch) {
      axios
        .get(`http://localhost:3001/service/${id}`)
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
        .get(`http://localhost:3001/service/`)
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
        .put(`http://localhost:3001/review/`, x.pack)
        .then((res) => {
          console.log(res);
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
        .put(`http://localhost:3001/request/`, x.pack)
        .then((res) => {
          console.log(res);
        })
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
      .get(`http://localhost:3001/all/`)
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
      .get(`http://localhost:3001/${to}/`)
      .then((res) => {
        dispatch({ type: type.SET_ACTUALG, payload: res });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: type.ERROR_FORM, payload: e });
      });
  };
}

export function clearActualG(to) {
  return { type: type.CLEAR_ACTUALG, payload: null };
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
  //logica
  return { type: type.ORDER_N, payload: n };
}

export function orderByV(n) {
  //logica
  return { type: type.ORDER_A, payload: n };
}

export function all() {
  return { type: "ALL" };
}
