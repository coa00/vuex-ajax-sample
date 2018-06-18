import fetch from "cross-fetch";
import types from "./apiTypes";

//同じようなコードが続くようであれば types をループで回しても良い。
const api = {
  [types.TEST]: data => {
    return fetch("https://api.github.com/users/coa00/repos", {
      method: "GET",
      body: data
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  },
  [types.FAIL]: data => {
    return fetch("https://fail", {
      method: "GET",
      body: data
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  }
};

export default api;
