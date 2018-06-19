import fetch from "cross-fetch";
import types from "./apiTypes";

// api の処理はここに集約
// api vuex を使わない場合は、api モジュールは直接呼ぶこと。ただし実装は合わせること。

// Fetch の使い方 https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
// cross-fetch は、node, ブラウザの両方で動作するfetch
// https://github.com/lquixada/cross-fetch
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
        //jsonを返す。
        //データの加工が必要ば場合は、ここで加工する
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  },
  // 失敗パターン
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
