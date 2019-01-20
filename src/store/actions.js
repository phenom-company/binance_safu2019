import AjaxTool from './utils/ajax_tool';
import router from '@/router';
import * as Api from '@/api';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SET_LOADER,
  DELETE_LOADER,
  SET_PERSONAL_DETAILS_AUTH_USER,
  SET_FILTER_BALANCES_PARAMS,
  SET_FILTER_CASES_PARAMS
} from './mutations';

import { API } from '@/api/path';

export const login = ({ dispatch, commit }, data) => {
  return new Promise((resolve, reject) => {
    commit(LOGIN);

    AjaxTool.post(`${API}/user/api-token-auth/`, {
      email: data.email,
      password: data.password
    }, data.blocker)
      .then((response) => {
        const token = 'JWT ' + response.data.token;
        commit(LOGIN_SUCCESS);
        localStorage.setItem('token', token);
        AjaxTool.setToken(token);
        dispatch('refreshState');
        router.push('/cases/dashboard');
        resolve(response);
      })
      .catch((error) => {
        commit(LOGIN_FAILED);
        reject(error.response);
      });
  });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  AjaxTool.setToken('');
  commit(LOGOUT);
};

export const setLoader =({ commit }, payload) => {
  commit(SET_LOADER, {blocker: payload.blocker});
};

export const deleteLoader =({ commit }, payload) => {
  commit(DELETE_LOADER, {blocker: payload.blocker});
};

export const getPersonalDetailsAuthUser = ({ commit }) => {

  Api.getPersonalDetailsAuthUser()
    .then((data) => {
      commit(SET_PERSONAL_DETAILS_AUTH_USER, {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        kyc: data.kyc,
        balance: data.balance,
        country: data.country,
        referralCode: data.referral_code,
        caseCount: data.case_count
      });
     
    })
    .catch(error => console.log('error accounts', error));
};

export const setFilterBalancesParams =({ commit }, payload) => {
  commit(SET_FILTER_BALANCES_PARAMS, payload);
}

export const setFilterCasesParams =({ commit }, payload) => {
  commit(SET_FILTER_CASES_PARAMS, payload);
}

export const refreshState = ({ dispatch, state }) => {
  if (state.isLoggedIn) {
    dispatch('getPersonalDetailsAuthUser');
  }
};
