import AjaxTool from '@/store/utils/ajax_tool';
import moment from 'moment';

import { API } from '@/api/path';

export const getApiKeys = (blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/scoring/api/`, {}, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const createApiKey = (blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.put(`${API}/scoring/api/`, {}, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const deleteApiKey = (id, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.delete(`${API}/scoring/api/${id}`, {}, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getScoring = (currency, address, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.post(`${API}/scoring/web/`, {"currency": currency, "address": address}, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
