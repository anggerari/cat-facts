<template>
  <div>
    <base-navigation />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseNavigation from '@/components/BaseNavigation.vue';

export default {
  name: 'Home',
  components: {
    BaseNavigation,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  font-size: 16px;
}
</style>
