<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item index="1" @click="goTo('/')">
      Home
    </el-menu-item>

    <el-menu-item index="4" @click="goTo('/facts')">
      My Facts
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'BaseNavigation',
  data() {
    return {
      activeIndex: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setActiveIndex();
      }, 100);
    });
  },
  methods: {
    setActiveIndex() {
      console.log(this.$route.path);
      switch (this.$route.name) {
        case 'Home':
          this.activeIndex = '1';
          break;
        case 'Facts':
          this.activeIndex = '4';
          break;
        default:
      }
      console.log(this.activeIndex);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-demo a {
  text-decoration: none;
}
</style>
