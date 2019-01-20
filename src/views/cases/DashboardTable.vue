<template>
  <b-card :header="caption">

    <b-row>
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
              :options="options"
              placeholder="Filter"
              v-model="valueMultiselect"
              :disable-branch-nodes="true"
              :searchable="false"
              :limit="1"
              />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="3">
        <b-form-group>
          <label class="mr-sm-2">Wallet or TxID: </label>
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
      <b-col lg="2">
        <label class="mr-sm-2">&nbsp;</label>
        <b-button block variant="primary" @click="filterData"><i class="fa fa-search"></i> Search</b-button>
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
      <template slot="txid" slot-scope="data">
        <span class="cut-txid">
          {{data.item.txid | txidCut}}
          <div class="full-txid">
            <span>{{data.item.txid}}</span>
          </div>
        </span>
      </template>
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="link" slot-scope="data">
        <router-link :to="{ path: '/cases/' + data.item.id }"> <i class="fa fa-sign-in"></i></router-link>
      </template>
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
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { setupCalendar, DatePicker } from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import moment from 'moment';

setupCalendar({
  firstDayOfWeek: 2, // Monday
});

const currency = [ {
  id: 'BTC',
  label: 'BTC',
}, {
  id: 'ETH',
  label: 'ETH',
}]

const type = [ {
  id: 'self',
  label: 'self',
}, {
  id: 'external',
  label: 'external',
}]

const status = [{
  id: 'approved',
  label: 'approved',
}, {
  id: 'rejected',
  label: 'rejected',
}, {
  id: 'auto-rejected',
  label: 'auto-rejected',
}, {
  id: 'temp-approved',
  label: 'temp-approved',
}]

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
      selected: null,
      userName: null,
      address: null,
      selectedDateFrom: null,
      selectedDateTill: null,
      valueMultiselect: [],
      options: [{
        id: 'Currency',
        label: 'Currency',
        children: currency
      }, {
        id: 'Type',
        label: 'Type',
        children: type
      }, {
        id: 'Status',
        label: 'Status',
        children: status
      }]
    }
  },
  computed: {
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields },
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
      let currencyList = [];
      let typeList = [];
      let statusList = [];

      if(this.valueMultiselect.length > 0) {
        this.valueMultiselect.map(item => {
          const value = item;
          type.map((item) => {
            if(item.id === value) {
              typeList.push(value);
            }
          });

          currency.map((item) => {
            if(item.id === value) {
              currencyList.push(value);
            }
          });

          status.map((item) => {
            if(item.id === value) {
              statusList.push(value);
            }
          });

        })
      }

      let dateTill = '';
      let dateFrom = '';

      if(this.selectedDateFrom) {
        dateFrom = moment(this.selectedDateFrom).format('YYYY-MM-DD');
      }

      if(this.selectedDateTill) {
        dateTill = moment(this.selectedDateTill).format('YYYY-MM-DD');
      }

      const params = {
        currecy: currencyList.join(),
        type: typeList.join(),
        status: statusList.join(),
        query: this.address,
        date_from: dateFrom,
        date_till: dateTill
      };

      this.$store.dispatch('setFilterCasesParams', params);
    }
  }
}
</script>

<style>
  .full-txid {
    display: none;
    position: absolute;
    top: 15px;
    padding: 10px;
    width: 200px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .cut-txid {
    position: relative;
    cursor: pointer;
  }

  .cut-txid:hover .full-txid {
    display: block;
  }
</style>
