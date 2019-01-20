<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group class="mobileWidth">
            <b-card no-body class="mobileWidth-card p-4" v-loading="getLoginLoaderStatus">
              <b-card-body>
                <div style="text-align: left; padding-bottom: 10px; margin-left: -10px;">
                  <img class="navbar-brand-full" src="/img/brand/logo.svg" width="160" height="50" alt="Logo">
                </div>
                <b-form>
                  <h1 style="padding-bottom: 10px;">Login to Spider</h1>

                  <p>Sign up using your email or Sign In with demo credentials:</p>
                  <p><b>Email: demo@phenom.team</b><br/><b>Password: !@#123QWEqwe</b></p>
                  <b-alert show variant="danger" v-if="errorMessage">
                    <h4 class="alert-heading">{{errorMessage}}</h4>
                  </b-alert>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Email"
                                  autocomplete="username email" v-model="userEmail"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password"
                                  autocomplete="current-password" v-model="userPassword"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" v-on:click="processLogin()">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" href="/auth/restore">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="mobileWidth-card text-white bg-primary py-5" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Meet Spider - universal scoring solution for the crypto industry. 
                    Sign up in order to check wallets' score or contributing to the platform by reporting losses.
                  </p>
                  <b-button variant="primary" class="active mt-3" href="/auth/register">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { validateEmail } from '@/utils/input_utils';

  export default {
    name: 'Login',

    data: () => ({
      userEmail: '',
      userPassword: '',
      errorMessage: null
    }),

    watch: {
      userEmail() {
        this.errorMessage = null;
      }
    },

    computed: {
      getLoginLoaderStatus() {
        return this.$store.getters.LOADERS.includes('login');
      },
    },

    methods: {
      processLogin() {
        
        if (this.userEmail.length > 0) {
          if (!validateEmail(this.userEmail)) {
            this.errorMessage = 'Email is invalid';
            return;
          }
        }

        const payload = {
          email: this.userEmail,
          password: this.userPassword,
          blocker: 'login'
        };

        this.$store.dispatch('login', payload)
          .catch(() => {});
      }
    }
  }
</script>
<style>
  @media (max-width: 991px) {
    .mobileWidth {
      display: flex;
      flex-wrap: warp;
    }

    .mobileWidth .mobileWidth-card {
      flex: 1 1 100%;
      width: 100% !important;
    }
  }
</style>

