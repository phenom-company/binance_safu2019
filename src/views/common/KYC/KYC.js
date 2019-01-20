import { mapState } from 'vuex';
import * as Api from '@/api';

export default {
  name: 'KYC',
  data() {
    return {
      showSumAndSup: false,
      kyc_status: 'pending'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
  },
  mounted() {
    this.showSumandSupFrame()
  },
  methods: {
    showSumandSupFrame() {
      this.showSumAndSup = true;
      Api.getKycApplicant()
        .then(response => {
          this.kyc_status = (response.sumsub_status) ? response.sumsub_status : "no documents";
          var id = idensic.init(
            // selector of an iframe container (see above)
            '#idensic',
            // configuration object (see preparation steps)
            {
              accessToken: response.access_token,
              applicantId: response.applicant_id
            },
            // function for the iframe callbacks
            function (messageType, payload) {
              // just logging the incoming messages
              console.log('[IDENSIC DEMO] Idensic message:', messageType, payload);
            }
          );
        })
        .catch(response => {
          console.error(response);
        });
    }
  }
}
