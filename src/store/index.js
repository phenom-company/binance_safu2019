import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  isLoggedIn: localStorage.getItem('token') !== null,
  loaders: [],
  user: {
    email: '',
    firstName: '',
    lastName: '',
    kyc: '',
    balance: 0,
    country: '',
    referralCode: '',
    caseCount: 0
  },
  filterBalancesParams: {
    operations: '',
    query: '',
    date_from: '',
    date_till: ''
  },
  filterCasesParams: {
    currecy: '',
    type: '',
    status: '',
    query: '',
    date_from: '',
    date_till: ''
  },
  curCaseId: ''
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
    