<template>
  <b-card :header="caption">

    <b-row>
      <b-col lg="2">
        <strong>Account Balance:</strong>
      </b-col>
      <b-col lg="10">
        {{user.balance}} BTC
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col lg="12">
        <b-alert show variant="secondary">
          <h4 class="alert-heading">Deposit Instructions</h4>
          <hr>
          <b-row>
            <b-col lg="2">
              <strong>Address:</strong>
            </b-col>
            <b-col lg="10">
              my5B7*****************4jUoZ <a href class="ml-2"><i class="fa fa-copy"></i></a>
            </b-col>
          </b-row>

          <h4 class="alert-heading mt-4">Disclaimer</h4>
          <hr>
          <p class="mb-0">
            I acknowledge the following information: 
            <br>By depositing tokens to this address, I agree to deposit recovery policy. Depositing tokens to an address other than BTC may result in your funds being lost.
          </p>
        </b-alert>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col lg="12">
        <strong>Transactions History</strong>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="2">
        <b-form-group>
          <label class="mr-sm-2">Filter: </label>
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text><i class="fa fa-filter"></i></b-input-group-text>
            </b-input-group-prepend>
            <treeselect
            style="flex: 1 1 0;"
            :multiple="true"
            :options="opertaionOptions"
            placeholder="Filter"
            v-model="selectedOperations"
            :disable-branch-nodes="true"
            :searchable="false"
            :limit="1"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="4">
        <b-form-group>
          <label class="mr-sm-2">Case ID or queried address:</label>
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="X03DSJ38" v-model="address"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group>
          <label class="mr-sm-2">Since: </label>
          <b-input-group style="flex-wrap: nowrap;">
            <b-input-group-prepend>
              <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
            </b-input-group-prepend>
            <v-date-picker
              style="display: flex; flex-wrap: nowrap;"
              mode='single'
              v-model='selectedDateFrom'>
              <template :type='inputState.type' slot-scope='props'>
                <b-form-input
                  type='text'
                  :value='props.inputValue'
                  placeholder='2019-02-01'
                  expanded>
                </b-form-input>
                <p
                  class='control'
                  v-if='selectedDateFrom'>
                  <button
                    class="btn-primary"
                    style="position: absolute; height: 100%; border-radius: 2px; margin-left: -27px;"
                    @click='selectedDateFrom = null'>
                    <i class="fa fa-close"></i>
                  </button>
                </p>
              </template>
            </v-date-picker>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group>
          <label class="mr-sm-2">Till: </label>
          <b-input-group style="flex-wrap: nowrap;">
            <b-input-group-prepend>
              <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
            </b-input-group-prepend>
            <v-date-picker
              style="display: flex; flex-wrap: nowrap;"
              mode='single'
              v-model='selectedDateTill'>
              <template slot-scope='props'>
                <b-form-input
                  type='text'
                  :value='props.inputValue'
                  placeholder='2019-02-01'
                  expanded>
                </b-form-input>
                <p
                  class='control'
                  v-if='selectedDateTill'>
                  <button
                    class="btn-primary"
                    style="position: absolute; height: 100%; border-radius: 2px; margin-left: -27px;"
                    @click='selectedDateTill = null'>
                    <i class="fa fa-close"></i>
                  </button>
                </p>
              </template>
            </v-date-picker>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="1">
        <label class="mr-sm-2">&nbsp;</label>
        <b-button block variant="primary" @click="filterData"><i class="fa fa-search"></i></b-button>
      </b-col>
      <b-col lg="1">
        <label class="mr-sm-2">&nbsp;</label>
        <b-button block variant="primary"><i class="fa fa-file-excel-o"></i></b-button>
      </b-col>
    </b-row>

    <b-table
      :dark="dark"
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :small="small"
      :fixed="fixed"
      responsive="sm"
      :items="items"
      :fields="captions"
      :current-page="currentPage"
      :per-page="perPage">
    </b-table>

    <div v-if="items.length <= 0">
      <p>No data</p>
    </div>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
import { setupCalendar, DatePicker } from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { mapState } from 'vuex';
import moment from 'moment';

setupCalendar({
  firstDayOfWeek: 2, // Monday
});

export default {
  name: 'c-table',
  components: {
    'v-date-picker': DatePicker,
    Treeselect
  },
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentPage: 1,
      selectedOperations: [],
      address: null,
      selectedDateFrom: null,
      selectedDateTill: null,
      opertaionOptions: [{
        id: 'deposit',
        label: 'deposit'
      }, {
        id: 'withdrawal',
        label: 'withdrawal'
      }, {
        id: 'reward',
        label: 'reward'
      }, {
        id: 'referral',
        label: 'referral'
      }]
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields }
  },
  methods: {
    getBadge (status) {
      return status === 'approved' ? 'success'
        : status === 'temp-approved' ? 'secondary'
          : status === 'rejected' ? 'warning'
            : status === 'auto-rejected' ? 'danger' : 'primary'
    },
    getRowCount: function () {
      return this.items.length
    },

    filterData() {
      let dateTill = '';
      let dateFrom = '';

      if(this.selectedDateFrom) {
        dateFrom = moment(this.selectedDateFrom).format('YYYY-MM-DD');
      }

      if(this.selectedDateTill) {
        dateTill = moment(this.selectedDateTill).format('YYYY-MM-DD');
      }

      const params = {
        operations: this.selectedOperations.join(),
        query: this.address,
        date_from: dateFrom,
        date_till: dateTill
      };

      this.$store.dispatch('setFilterBalancesParams', params);
    }
  }
}
</script>
<style>
  .form-select-checkbox {
    flex: 1 1 0;
  }

  .form-select-checkbox input.form-control {
    height: calc(2.0625rem + 2px) !important;
    margin-left: -90% !important;
    padding: 0.375rem 0.75rem !important;
    max-width: 100% !important;
  }

  .form-select-checkbox.form-select-checkbox_selected input.form-control {
    margin-left: 0 !important;
    max-width: 1px !important;
  }

  .form-select-checkbox .dropdown-toggle {
    border: 1px solid #e4e7ea;
    border-radius: 0.25rem;
  }

  .form-select-checkbox .dropdown-toggle {
    align-items: center;
  }
</style>

