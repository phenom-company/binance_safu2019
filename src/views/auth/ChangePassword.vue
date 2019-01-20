<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4" v-loading="getchangePasswordStatus">
              <b-form>   
                <b-form>
                  <h1>Restore password</h1>
                  <p class="text-muted">Restore your password</p>

                  <div v-if="!errorMessage">
                    <b-input-group class="mb-3">
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-people"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="password" class="form-control" placeholder="Password" v-model="newPassword"/>
                    </b-input-group>

                    <b-input-group class="mb-3">
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-people"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="password" class="form-control" placeholder="Confirm assword" v-model="confirmPassword"/>
                    </b-input-group>

                    <b-button variant="success" @click="changePassword" block>Restore</b-button>
                    <br>
                    <b-alert show variant="danger" v-if="errorPassword">
                      {{ errorPassword }}
                    </b-alert>
                  </div>

                  <div v-if="errorMessage">
                    <b-alert show variant="danger">
                      {{ errorMessageText }}
                    </b-alert>
                    <p>You will be redirected to login page tab within 4 seconds or click button below.</p>
                    <b-button variant="danger" @click="goLoginPage" block>Go Login Page</b-button>
                  </div>
              </b-form>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api';
import router from '@/router';

export default {
  name: 'Confirm',
  data: function () {
    return {
      code: null,
      newPassword: null,
      confirmPassword: null,
      errorPassword: null,
      errorMessage: false,
      errorMessageText: null
    };
  },
  created () {
    this.code = this.$route.query.code;

    if (this.code) {
      Api.checkCodeRestorePassword(this.code)
        .then(() => {})
        .catch((error) => {
          if(error) {
            this.errorMessage = true;

            if(error.data.detail) {
              this.errorMessageText = error.data.detail;
            }
            
            if(error.data.code) {
              this.errorMessageText = error.data.code[0];
            }

            setTimeout(() => {
              router.push('/auth/login');
            }, 4000);
          }
        });
    } else router.push('/');
  },

  computed: {
    getchangePasswordStatus() {
      return this.$store.getters.LOADERS.includes('changePassword');
    },
  },

  watch: {
    newPassword() {
      this.errorPassword = '';
    },

    confirmPassword() {
      this.errorPassword = '';
    },
  },

  methods: {
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorPassword = 'Password don\'t match';

        return;
      }

      const data = {
        code: this.code,
        new_password: this.newPassword
      }

      const blocker = 'changePassword';

      Api.restorePassword(data, blocker)
        .then(() => {
          router.push('/auth/login');
        })
        .catch(() => {});

    },
    goLoginPage() {
      router.push('/auth/login');
    }
  }
};

</script>
