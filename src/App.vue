<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    mounted : function(){
      //$store.dispatch('GET_CLIENT_INFO', {blocker: 'clientInfo', payload: {}});
    },
  }
</script>

<style src="spinkit/scss/spinkit.scss" lang="scss"/>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';

  // spinner
  .sk-fading-circle .sk-circle {
    margin: 0 auto;
  }

  .sk-three-bounce {
    height: 40px;
  }

  .popover-cursor {
    cursor: help;
  }
</style>
