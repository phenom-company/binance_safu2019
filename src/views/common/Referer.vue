<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Referral program</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <b-row>
                <b-col cols="1">
                  <qr-code :text="'https://spider.phenom.team/?ref=' + user.referralCode"
                           :size="64"
                           error-level="L"></qr-code>
                </b-col>
                <b-col cols="6">
                  <b-row class="mb-3">
                    <b-col cols="4">
                      My Referral Id:
                    </b-col>
                    <b-col cols="3">
                      <strong>{{refererData.id}}</strong>
                    </b-col>
                    <b-col cols="5" class="text-right">
                      Your commission rate is <strong>20%</strong>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col cols="4">
                      Referral Link:
                    </b-col>
                    <b-col cols="6">
                      <b-form-input id="basicName" type="text" autocomplete="name"
                                    :value="'https://spider.phenom.team/?ref=' + user.referralCode"></b-form-input>
                    </b-col>
                    <b-col cols="2">
                      <b-button block variant="primary" @click="copyToKeyboard('https://spider.phenom.team/?ref=' + user.referralCode)"><i class="fa fa-copy"></i></b-button>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col cols="4">

                    </b-col>
                    <!-- <b-col cols="8">
                      <b-button size="sm" class="mr-1 btn-brand" variant="facebook"><i class="fa fa-facebook"></i><span>Facebook</span>
                      </b-button>
                      <b-button size="sm" class="mr-1 btn-brand" variant="twitter"><i class="fa fa-twitter"></i><span>Twitter</span>
                      </b-button>
                    </b-col> -->
                  </b-row>
                </b-col>
                <b-col cols="2" class="text-center">
                  Referral Friends
                  <h3 class="mt-2">{{refererData.referrers_number}}</h3>
                </b-col>
                <b-col cols="2" class="text-center">
                  Estimated Commission value
                  <h3 class="mt-2">{{refererData.commission_value}} BTC</h3>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6">
                  <strong>Referral Friends</strong>
                  <div class="table-responsive-sm mt-4">
                    <table class="table b-table table-bordered b-table-fixed">
                      <thead>
                      <tr>
                        <th>E-mail</th>
                        <th>Date</th>
                      </tr>
                      </thead>
                      <tbody v-if="refererData.referrers && refererData.referrers.length > 0">
                        <tr v-for="item in refererData.referrers" :key="item.id">
                          <td>{{item.email}}</td>
                          <td>{{item.created_at_dt | normalData}}</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="2">No data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
                <b-col cols="6">
                  <strong>Referral Transactions</strong>
                  <div class="table-responsive-sm mt-4">
                    <table class="table b-table table-bordered b-table-fixed">
                      <thead>
                      <tr>
                        <th>E-mail</th>
                        <th>Date</th>
                        <th>Amount</th>
                      </tr>
                      </thead>
                      <tbody v-if="refererData.transactions && refererData.transactions.length > 0">
                        <tr v-for="item in refererData.transactions" :key="item.id">
                          <td>{{item.email}}</td>
                          <td>{{item.created_at_dt | normalData}}</td>
                          <td>{{item.amount}} BTC</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="3">No data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
              </b-row>
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
  import moment from 'moment';

  export default {
    name: 'referer',
    data() {
      return {
        refererData: {}
      }
    },

    computed: {
      ...mapState({
        user: state => state.user
      }),
    },

    mounted() {
      Api.getReferalData()
        .then((response) => {
          this.refererData = response;
        })
        .catch(() => {});
    },

    methods: {
      copyToKeyboard(url) {
        var $body = document.getElementsByTagName("body")[0];
        var $tempInput = document.createElement("INPUT");
        $body.appendChild($tempInput);
        $tempInput.setAttribute("value", url);
        $tempInput.select();
        document.execCommand("copy");
        $body.removeChild($tempInput);
      }
    },

    filters: {
      normalData: function(value) {
        if (!value) return '';

        return moment(value).format('YYYY-MM-DD HH:MM:SS');
      }
    }
  }
</script>
