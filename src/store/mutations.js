export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SET_LOADER = 'SET_LOADER';
export const DELETE_LOADER = 'DELETE_LOADER';
export const SET_PERSONAL_DETAILS_AUTH_USER = 'SET_PERSONAL_DETAILS_AUTH_USER';
export const SET_FILTER_BALANCES_PARAMS = 'SET_FILTER_BALANCES_PARAMS';
export const SET_FILTER_CASES_PARAMS = 'SET_FILTER_CASES_PARAMS';

export default {
  [LOGIN](state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [LOGIN_FAILED](state) {
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
    state.user = {};
  },
  [SET_LOADER] (state, payload) {
    state.loaders.push(payload.blocker);
  },
  [DELETE_LOADER] (state, payload) {
    let index = state.loaders.indexOf(payload.blocker);
    if (index >= 0) {
      state.loaders.splice(index, 1);
    }
  },
  [SET_PERSONAL_DETAILS_AUTH_USER](state, payload) {
    state.user = payload;
  },
  [SET_FILTER_BALANCES_PARAMS](state, payload) {
    state.filterBalancesParams = payload;
  },
  [SET_FILTER_CASES_PARAMS](state, payload) {
    state.filterCasesParams = payload;
  },
  // [SET_CUR_CASE_ID](state, payload) {
  //   state.curCaseID = payload;
  // },
};
