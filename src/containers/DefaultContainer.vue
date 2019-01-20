<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <img class="navbar-brand-full" src="/img/brand/logo.svg" width="160" height="50" alt="Logo">
        <img class="navbar-brand-minimized" src="/img/brand/sygnet.svg" width="30" height="30" alt="Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/common/balance">
          <span class="mr-1">Balance: </span>
          <i class="fa fa-btc"></i> {{ user.balance }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
      <b-navbar-nav class="float-right">
        <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
          <b-button pressed block variant="link" aria-pressed="true" :to="{ path: '/cases/new' }"><i class="fa fa-plus"></i> Submit loss</b-button>
        </b-col>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>

        <a class="nav-link" href="/common/balance">
          <!-- <img
            src="/img/avatars/6.jpg"
            class="img-avatar" /> -->
          <span style="float: left; font-size: 10.5px;"> {{ user.email }} <br> <i class="fa fa-btc"></i> {{ user.balance }} </span>
        </a>

        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://spider.phenom.team" target="_blanck">Spider</a>
        <span class="ml-1">&copy; 2018 Phenom.Team</span>
      </div>
      <div class="ml-auto"></div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav';
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue';
import * as Api from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
