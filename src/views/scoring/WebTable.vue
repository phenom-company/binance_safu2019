<template>
  <div>
    <b-row class="mb-3">
      <b-col cols="2">
        <strong>Instant Score ></strong>
      </b-col>
      <b-col cols="2">
        <b-form-input
          v-model="filterValue"
          id="basicName" 
          type="text"
          :value="0"></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button type="submit" size="md" variant="primary" @click="filterData">Show</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table
          :filter="filter"
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'w-table',
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
        filter: '',
        filterValue: ''
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
      getRowCount: function () {
        return this.items.length
      },
      filterData() {
        this.filter = this.filterValue;
      }
    }
  }

</script>