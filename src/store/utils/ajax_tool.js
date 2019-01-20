import axios from 'axios';
import store from '@/store/index';

function checkAuth(error) {
  // token expiry processor
  if (error.request.status === 401) {
    // console.log('token expired');
    if (store.state.isLoggedIn) {
      store.dispatch('logout');
    }
  }
}

function toFormData(data) {
  const fd = new FormData();

  for (let name in data) {
    fd.append(name, data[name]);
  }

  return fd;
}
export class AxiosInstance {
  constructor(token) {
    if (token) {
      this.axios = axios.create({
        headers: { 'Authorization': token }
      });
    } else {
      this.axios = axios;
    }
  }

  _createRequest({ method, url, params, blocker }) {
    blocker && store.dispatch('setLoader', { blocker: blocker });
    return new Promise((resolve, reject) => {
      this.axios[method](url, params)
        .then((response) => {
          resolve(response);
          blocker && store.dispatch('deleteLoader', { blocker: blocker });
        })
        .catch((error) => {
          checkAuth(error);
          reject(error);
          console.log(blocker);
          blocker && store.dispatch('deleteLoader', { blocker: blocker });
          let e = error.response.data !== 'undefined' ? error.response.data : 'Some error occured.';
          window.toastr.error(Object.values(e), 'Error!');
        });
    });
  }

  get(url, params, blocker) {
    return this._createRequest({ method: 'get', url, params, blocker });
  }

  post(url, params, blocker) {
    return this._createRequest({ method: 'post', url, params, blocker });
  }

  put(url, params, blocker) {
    return this._createRequest({ method: 'put', url, params, blocker });
  }

  delete(url, params, blocker) {
    return this._createRequest({ method: 'delete', url, params, blocker });
  }

  putFormData(url, data) {
    return new Promise((resolve, reject) => {
      this.axios({
        method: 'put',
        url,
        data: toFormData(data),
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          checkAuth(error);
          reject(error);
        });
    });
  }

  setToken(token) {
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    this.axios = axios.create({
      headers: {
        'Authorization': token,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }
}

export default new AxiosInstance(localStorage.getItem('token'));
