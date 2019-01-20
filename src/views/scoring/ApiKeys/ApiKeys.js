import * as Api from '@/api';

export default {
  name: 'ApiKeys',
  data() {
    return {
      apiKeys: []
    }
  },
  mounted() {
    this.getKeys()
  },
  methods: {
    getKeys() {
      Api.getApiKeys()
        .then(response => {
          this.apiKeys = response;
        })
        .catch(response => {
          console.error(response);
        });
    },
    createKey() {
      Api.createApiKey()
        .then(response => {
          this.getKeys();
          window.toastr.success('Generated api key');
        })
        .catch(response => {
          console.error(response);
        });
    },
    deleteKey(id) {
      Api.deleteApiKey(id)
        .then(response => {
          this.getKeys();
          window.toastr.success('Deleted api key');
        })
        .catch(response => {
          console.error(response);
        });
    }
  }
}
