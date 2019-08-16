<template>
  <z-canvas :views="views"></z-canvas>
</template>

<script>
  import main from './components/Main';
  import friend from './components/Friend';

  export default {
    data: () => ({
      views: {
        main,
        friend
      }
    }),
    mounted: function() {
      this.$zircle.setView('main');
      if (!localStorage.getItem('answers')) {
        const emptyArray = ['','','','','',''];
        localStorage.setItem('answers', JSON.stringify(emptyArray));
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
  @import url('https://use.fontawesome.com/releases/v5.1.0/css/all.css');
</style>
