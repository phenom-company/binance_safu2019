<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table :table-data="cases" :fields="fields" v-loading="getCasesTableLoaderStatus" caption="<i class='fa fa-align-justify'></i> Submited cases"></c-table>
      </b-col>
    </b-row><!--/.row-->

    <b-popover target="txid-popover"
               placement="topright"
               title="TxID"
               triggers="hover focus"
               content="Id of transaction where funds were illigaly transfered">
    </b-popover>
    <b-popover target="profit-popover"
               placement="topright"
               title="Profit"
               triggers="hover focus"
               content="Profit column reflects the total amount of funds accounted to your account balance for all queries related to the case.">
    </b-popover>
  </div>
</template>

<script>
// import { shuffleArray } from '@/shared/utils';
import cTable from './DashboardTable.vue';
import * as Api from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'tables',
  components: {cTable},
  data: () => {
    return {
      fields: [
        {key: 'id', label: 'Id', sortable: true},
        {key: 'created_at_dt', label: 'Submission date', sortable: true},
        {key: 'currency', label: 'Currency'},
        {key: 'type', label: 'Type', sortable: true},
        {key: 'address', label: 'Address', sortable: true},
        {key: 'txid', label: 'TxID <i class="fa fa-question-circle ml-1 popover-cursor" id="txid-popover" variant="primary"></i>'},
        {key: 'status', label: 'Status', sortable: true},
        {key: 'income', label: 'Profit <i class="fa fa-question-circle ml-1 popover-cursor" id="profit-popover" variant="primary"></i>'},
        {key: 'link', label: 'Details'},
      ],
      cases: []
    }
  },

  watch: {
    filterCasesParams() {
      this.getCaseList();
    }
  },

  computed: {
    ...mapState({
      filterCasesParams: state => state.filterCasesParams
    }),

    getCasesTableLoaderStatus() {
      return this.$store.getters.LOADERS.includes('cases');
    }
  },

  mounted() {
    this.$store.dispatch('setFilterCasesParams', {});

    this.getCaseList();
  },

  methods: {
    getCaseList() {
      const blocker = 'cases';

      Api.getCases({ params: this.filterCasesParams}, blocker)
      .then((response) => {
        this.cases = response;
      })
      .catch(() => {});
    }
  }
}
</script>
