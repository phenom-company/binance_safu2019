<script src="./ApiKeys.js"></script>
<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> API</strong>
              <div class="card-header-actions"></div>
            </div>
            <b-button size="md" variant="primary" @click="createKey()" >Generate API key</b-button>

            <div class="table-responsive-sm mt-4">
              <table class="table b-table table-bordered b-table-fixed">
                <thead>
                <tr>
                  <th>Action</th>
                  <th>Api-Key Token</th>
                  <!--<th>Created</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in apiKeys">
                  <td>
                    <b-button size="md" variant="primary"  @click="deleteKey(item.id)" >Delete</b-button>
                    <!--<b-button size="md" variant="primary ml-2">Stat</b-button>-->
                  </td>
                  <td>{{item.key}} </td>
                  <!--<td>???</td>-->
                </tr>
                <tr v-if="apiKeys.length < 1">
                  <td colspan="2">Nothing found.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
