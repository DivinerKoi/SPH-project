<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="$route.meta.show"></Footer>
    
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //性能优化，商品的三级列表放在App根组件中，只执行一次
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
