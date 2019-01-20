<script src="./KYC.js"></script>
<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i>
              <strong> KYC Profile</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <p>
                <strong>KYC Information:</strong>
              </p>
              <b-row>
                <b-col cols="6">
                  <div class="row mb-3">
                    <div class="col-4">
                      KYC status:
                    </div>
                    <div class="col-3">
                      <strong>{{ kyc_status }}</strong>
                    </div>
                    <!--<div class="text-right col-5" v-if="kyc_status == 'no documents'">
                      To raise your account limit you need to specify the additional information about you:
                    </div>
                    <div class="text-right col-5" v-if="kyc_status == 'pending'">
                      Your KYC is pending. It can take up to 72 hours.
                    </div>-->
                  </div>
                </b-col>
              </b-row>

              <div slot="footer">
                <!--<b-button   @click="showSumandSupFrame" size="md" variant="primary" v-if="!showSumAndSup"> Upgrade KYC</b-button>-->
              </div>
            </div>
            <div id="idensic"></div>
          </b-card>
        </b-col>
      </b-row>

    </div>
  </div>
</template>

