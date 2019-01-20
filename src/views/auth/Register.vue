<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="7" sm="8">
          <b-card no-body class="mx-4" v-loading="getRegisterLoaderStatus">
            <b-card-body class="p-4" v-if="!isSendEmail">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>

                <b-alert show variant="danger" v-if="errorMessage">
                  <h4 class="alert-heading">{{errorMessage}}</h4>
                </b-alert>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="First name" autocomplete="username" v-model="userFirstName" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Last name" autocomplete="username" v-model="userLastName" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email" v-model="userEmail"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-location-pin"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <v-select v-model="selected" :options="options" placeholder="Select your country" style="flex: 1 1 0"></v-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="new-password" v-model="userPassword"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-people"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Referral code(optional)" v-model="referralCode"/>
                </b-input-group>

                <b-form-group>
                  <b-form-checkbox-group id="basicInlineCustomCheckboxes">
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" class="custom-control-input" id="customInChk1" value="1">
                      <label class="custom-control-label" for="customInChk1">I agree to <a href target="_blank">Terms of Use</a></label>
                    </div>
                  </b-form-checkbox-group>
                </b-form-group>

                <b-button variant="success" @click="signUpUser" block>Create Account</b-button>

                <p class="text-muted mt-4 pull-right">Already Registered? <a href="/auth/login">Log in</a></p>
              </b-form>
            </b-card-body>
            <b-card-body class="p-4" v-if="isSendEmail">
              Please check your inbox for a confirmation e-mail.
              <br><br>
              Just follow the link sent to&nbsp; 
              <b> {{ userEmail }} </b> &nbsp;in order to verify your account.
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import * as Api from '@/api';
import options from '@/json/countries.json';
import { validateEmail } from '@/utils/input_utils';

export default {
  name: 'Register',
  components: {
    vSelect
  },
  data: function() {
    return {
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userPassword: null,
      referralCode: '',
      selected: null,
      options: options,
      isSendEmail: false,
      errorMessage: null
    }
  },

  watch: {
    userEmail() {
      this.errorMessage = null;
    }
  },

  computed: {
    getRegisterLoaderStatus() {
      return this.$store.getters.LOADERS.includes('register');
    },
  },

  methods: {
    signUpUser() {
      if (this.userEmail.length > 0) {
        if (!validateEmail(this.userEmail)) {
          this.errorMessage = 'Email is invalid';
          return;
        }
      }

      const data = {
        password: this.userPassword,
        email: this.userEmail,
        last_name: this.userLastName,
        first_name: this.userFirstName,
        country: this.selected.label,
        referral_code: this.referralCode
      };

      const blocker = 'register';

      Api.registrationUser(data, blocker)
        .then(() => {
          this.isSendEmail = true;
        })
        .catch(() => {
          this.isSendEmail = false;
        });
      
    }
  }
}
</script>
