<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>E-mail confirmation</h1>
                <p class="text-muted" v-if="isEmailConfirm"><i class="icon-check mr-1"></i> Your E-mail has been confirmed.</p>
                <p v-if="!isEmailConfirm">
                  {{errorMessage}}
                </p>
                <p>You will be redirected to login page tab within 4 seconds or click button below.</p>
                <b-button variant="success" @click="goLoginPage"> go Login Page</b-button>
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
      isEmailConfirm: false,
      errorMessage: null
    };
  },
  created () {
    let code = this.$route.query.code;

    if (code) {
      Api.verifyEmail(code)
        .then(() => {
          this.isEmailConfirm = true;
        })
        .catch((error) => {
          if(error) {
            this.errorMessage = error.data.detail
          }
        });

      setTimeout(() => {
        router.push('/auth/login');
      }, 4000);

    } else router.push('/');
  },
  methods: {
    goLoginPage() {
      router.push('/auth/login');
    }
  }
};

</script>
