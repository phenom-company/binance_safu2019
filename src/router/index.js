import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const CasesDashboard = () => import('@/views/cases/Dashboard');
const CasesNew = () => import('@/views/cases/New');
const CaseDetails = () => import('@/views/cases/Details');
const ApiKeys = () => import('@/views/scoring/ApiKeys/ApiKeys.vue');
const ScoringWeb = () => import('@/views/scoring/Web');
const CommonProfile = () => import('@/views/common/Profile');
const KycPage = () => import('@/views/common/KYC/KYC.vue');
const CommonReferer = () => import('@/views/common/Referer');
const CommonBalance = () => import('@/views/common/Balance');

// Views - Pages
const Login = () => import('@/views/auth/Login');
const Register = () => import('@/views/auth/Register');
const Restore = () => import('@/views/auth/Restore');
const Confirm = () => import('@/views/auth/Confirm');
const ChangePassword = () => import('@/views/auth/ChangePassword');

Vue.use(Router);

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/cases/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: CasesDashboard
        },
        {
          path: '/cases',
          redirect: '/cases/dashboard',
          name: 'Cases',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'dashboard',
              name: 'Dashboard',
              component: CasesDashboard
            },
            {
              path: 'new',
              name: 'New',
              component: CasesNew
            },
            {
              path: ':id',
              name: 'Details',
              component: CaseDetails
            },
          ]
        },
        {
          path: '/scoring',
          redirect: '/scoring/web',
          name: 'Scoring',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'web',
              name: 'Web',
              component: ScoringWeb
            },
            {
              path: 'api',
              name: 'ApiKeys',
              component: ApiKeys
            }
          ]
        },
        {
          path: '/common',
          redirect: '/common/profile',
          name: 'Common',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'profile',
              name: 'Profile',
              component: CommonProfile
            },
            {
              path: 'kyc',
              name: 'KYC',
              component: KycPage
            },
            {
              path: 'refer-friends',
              name: 'Referer',
              component: CommonReferer
            },
            {
              path: 'balance',
              name: 'Balance',
              component: CommonBalance
            },
          ]
        },
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'Auth',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'restore',
          name: 'Restore',
          component: Restore
        },
        {
          path: 'confirm',
          name: 'Confirm',
          component: Confirm
        }
      ]
    },
    {
      path: '/restore-password',
      name: 'ChangePassword',
      component: ChangePassword
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.isLoggedIn
    && to.name !== 'Login'
    && to.name !== 'Register'
    && to.name !== 'Confirm'
    && to.name !== 'Restore'
    && to.name !== 'ChangePassword') {
    next({ path: '/auth/login' });

    return;
  }

  if (to.path === '/auth/logout') {
    store.dispatch('logout');
    next({ path: '/auth/login' });

    return;
  }

  next();
});

export default router;
