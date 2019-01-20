<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            v-loading="getCaseInformStatus"
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Case #{{$route.params.id}}</strong> - <b-badge pill :variant="getBadge(caseData.status)">{{caseData.status}}</b-badge>
              <div class="card-header-actions"></div>
            </div>
            <b-row class="mb-2">
              <b-col cols="2">
                <strong>Case Submission Date:</strong>
              </b-col>
              <b-col cols="4">
                {{caseData.created_at_dt | normalData}}
              </b-col>
               <b-col cols="3" v-if="caseData.address">
                <strong>Origin or Destination address:</strong>
              </b-col>
              <b-col cols="3" v-if="caseData.address">
                {{caseData.address}}
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2">
                <strong>Currency:</strong>
              </b-col>
              <b-col cols="4">
                {{caseData.currency}}
              </b-col>
              <b-col cols="3">
                <strong>TxID:</strong>
              </b-col>
              <b-col cols="3">
                {{caseData.txid}}
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2">
                <strong>Type:</strong>
              </b-col>
              <b-col cols="4">
                {{caseData.type}}
              </b-col>
              <b-col cols="3">
                <strong>Profit (in BTC):</strong>
              </b-col>
              <b-col cols="3">
                <span v-if="caseData.income">{{caseData.income}}</span>
                <span v-else>—</span>
                <br><small>Click <router-link :to="'/common/balance/?caseId=' + $route.params.id">Here</router-link> to view all transactions related to this case</small>
              </b-col>
            </b-row>
            <b-row class="mb-2" v-if="caseData.files && caseData.files.length > 0">
              <b-col cols="2">
                <strong>Attached documents:</strong>
              </b-col>
              <b-col cols="8">
                <span v-for="(file) in caseData.files" :key="file.id">
                  <a 
                    download
                    target="_blank"
                    :href="'http://safu-media.phenom.team/' + file.url" 
                    class="mr-3" v-if="file.ext === 'png' || file.ext === 'jpg'">
                    <i class="fa fa-file-image-o"></i>
                  </a>
                  <a 
                    download
                    target="_blank"
                    :href="'http://safu-media.phenom.team/' + file.url"
                    v-if="file.ext === 'pdf'"
                    class="mr-3">
                    <i class="fa fa-file-pdf-o"></i>
                  </a>
                  <a 
                    download
                    target="_blank"
                    :href="'http://safu-media.phenom.team/' + file.url"
                    v-if="file.ext === 'doc' || file.ext === 'docx'"
                    class="mr-3">
                    <i class="fa file-word-o"></i>
                  </a>
                </span>
              </b-col>
            </b-row>
            <b-row class="mb-2" v-if="caseData.resolution_file">
              <b-col cols="2">
                <strong>Case Resolution:</strong>
              </b-col>
              <b-col cols="8">
                <a target="_blank" :href="caseData.resolution_file" download>Download</a>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import * as Api from '@/api';
  import router from '@/router';
  import moment from 'moment';

  export default {
    name: 'new',
    data() {
      return {
        caseData: {}
      }
    },

    computed: {
      getCaseInformStatus() {
        return this.$store.getters.LOADERS.includes('case');
      }
    },

    created () {
      let caseId = this.$route.params.id;
      if (caseId) {
        const blocker = 'case';
        Api.getInformCase(caseId, blocker)
          .then((response) => {
            this.caseData = response;
          })
          .catch(() => {});
      }
    },

    methods: {
      getBadge (status) {
        return status === 'approved' ? 'success'
          : status === 'temp-approved' ? 'secondary'
            : status === 'rejected' ? 'warning'
              : status === 'auto-rejected' ? 'danger' : 'primary'
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
