<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12" sm="6" lg="4">
          <b-card :no-body="true">
            <b-card-body class="p-3 clearfix">
              <i class="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
              <div class="h5 text-info mb-0 mt-2 text-uppercase">Balance</div>
              <div class="text-muted font-weight-bold font-xs">{{user.balance}} BTC</div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col cols="12" sm="6" lg="4">
          <b-card :no-body="true">
            <b-card-body class="p-3 clearfix">
              <i class="fa fa-book bg-info p-3 font-2xl mr-3 float-left"></i>
              <div class="h5 text-info mb-0 mt-2 text-uppercase">Cases created</div>
              <div class="text-muted font-weight-bold font-xs">{{user.caseCount}}</div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col cols="12" sm="6" lg="4">
          <b-card :no-body="true">
            <b-card-body class="p-3 clearfix">
              <i class="fa fa-vcard-o  bg-info p-3 font-2xl mr-3 float-left"></i>
              <div class="h5 text-info mb-0 mt-2 text-uppercase">Account verification</div>
              <div class="text-muted font-weight-bold font-xs">Verifed</div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Profile</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <p>
                <strong>Personal Information:</strong>
              </p>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="First Name"
                    label-for="firstName"
                    :label-cols="4"
                    :horizontal="true">
                    <b-form-input id="firstName" type="text" autocomplete="name" :value="user.firstName" disabled></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Country"
                    label-for="countryName"
                    :label-cols="4"
                    :horizontal="true">
                    <b-form-input id="countryName" type="text" autocomplete="name" :value="user.country" disabled></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Last Name"
                    label-for="lastName"
                    :label-cols="4"
                    :horizontal="true">
                    <b-form-input id="lastName" type="text" autocomplete="name" :value="user.lastName" disabled></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="E-mail"
                    label-for="emailName"
                    :label-cols="4"
                    :horizontal="true">
                    <b-form-input id="emailName" type="text" autocomplete="name" :value="user.email" disabled></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <p class="mt-4">
                <strong>Change password:</strong>
              </p>
              <b-alert show variant="danger" v-if="errorPassword">
                {{ errorPassword }}
              </b-alert>
              <b-form-group
                label="Old password"
                label-for="oldName"
                :label-cols="2"
                :horizontal="true">
                <b-form-input id="oldName" type="password" v-model="oldPassword"></b-form-input>
              </b-form-group>
              <b-form-group
                label="New password"
                label-for="newName"
                :label-cols="2"
                :horizontal="true">
                <b-form-input id="newName" type="password" v-model="newPassword"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Confirm password"
                label-for="confirmName"
                :label-cols="2"
                :horizontal="true">
                <b-form-input id="confirmName" type="password" v-model="confirmPassword"></b-form-input>
              </b-form-group>
              <div slot="footer">
                <b-button type="submit" size="md" variant="primary" @click="changePassword">Change password</b-button>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import * as Api from '@/api';
  import { mapState } from 'vuex';
  import AjaxTool from '@/store/utils/ajax_tool';

  export default {
    name: 'profile',
    data() {
      return {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        errorPassword: null
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),

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

      oldPassword() {
        this.errorPassword = '';
      }
    },

    methods: {
      changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.errorPassword = 'Password don\'t match';

          return;
        }

        const data = {
          old_password: this.oldPassword,
          new_password: this.newPassword
        }

        const blocker = 'changePassword';

        Api.changePassword(data, blocker)
          .then((response) => {
            //localStorage.setItem('token', token);
            // AjaxTool.setToken(token);
            // dispatch('refreshState');
          })
          .catch((error) => {
            if(error) {
              this.errorPassword = error.data.detail;
            }
          });
      }
    }
  }
</script>
