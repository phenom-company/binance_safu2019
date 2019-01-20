<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table :table-data="balances" :fields="fields" v-loading="getBalancesTableLoaderStatus" caption="<i class='fa fa-align-justify'></i> Balance"></c-table>
      </b-col>
    </b-row><!--/.row-->
  </div>

</template>

<script>
import cTable from './BalanceTable.vue';
import * as Api from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'tables',
  components: {cTable},
  data: () => {
    return {
      fields: [
        {key: 'id', label: 'Id', sortable: true},
        {key: 'created_at_dt', label: 'Transaction date', sortable: true},
        {key: 'operation', label: 'Type', sortable: true},
        {key: 'amount', label: 'Amount', sortable: true},
        // {key: 'wallet', label: 'Address', sortable: true}
      ],
      balances: [],
      caseId: null
    }
  },

  created () {
    this.caseId = this.$route.query.caseId;

    if (this.caseId) {
      const blocker = 'balances';

      Api.getBalanceList({ params: {query: this.caseId}}, blocker)
        .then((response) => {
          this.balances = response;
        })
        .catch(() => {});
    }
  },

  watch: {
    filterBalancesParams() {
      this.getBalanceList();
    }
  },

  computed: {
    ...mapState({
      filterBalancesParams: state => state.filterBalancesParams
    }),

    getBalancesTableLoaderStatus() {
      return this.$store.getters.LOADERS.includes('balances');
    },
  },

  mounted() {
    if(!this.caseId) {
      this.$store.dispatch('setFilterBalancesParams', {});
      this.getBalanceList();
    }
  },

  methods: {
    getBalanceList() {
      const blocker = 'balances';

      Api.getBalanceList({ params: this.filterBalancesParams}, blocker)
      .then((response) => {
        this.balances = response;
      })
      .catch(() => {});
    }
  }
}
</script>
