<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4" v-loading="getRestorePasswordStatus">
              <b-form v-if="!isRestorePassword">
                <h1>Restore</h1>
                <p class="text-muted">Restore your password</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Email" v-model="userEmail" autocomplete="email" />
                </b-input-group>

                <b-button variant="success" @click="restorePassword" block>Restore</b-button>
              </b-form>
              
              <div v-if="isRestorePassword">
                <h1>Restore</h1>
                <p> Please check your inbox.
                <br>
                <p> Just follow the link sent to&nbsp; {{ userEmail }} &nbsp;in order to restore password.</p>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api';

export default {
  name: 'Restore',
  data: function() {
    return {
      userEmail: null,
      isRestorePassword: false
    }
  },

  computed: {
    getRestorePasswordStatus() {
      return this.$store.getters.LOADERS.includes('restore');
    },
  },

  methods: {
    restorePassword() {
      const blocker = 'restore';

      Api.requestRestorePassword(this.userEmail, blocker)
          .then(response => {
            this.isRestorePassword = true;
          })
          .catch(response => {});
    }
  }
}
</script>
