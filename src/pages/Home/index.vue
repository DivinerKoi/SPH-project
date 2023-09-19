<template>
  <div>
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <Rank></Rank>
      <Like></Like>
      <Floor v-for="(floor) in floorList" :key= floor.id :list = floor></Floor>
      <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed : {
    ...mapState({
      //获取floor组件的数据
      floorList: (state)=>{
        return state.home.floorList
      }
    })
  },
  mounted(){
    //派发actions获取floor信息
    this.$store.dispatch('getFloorList')
    //获取用户信息在首页展示
    this.$store.dispatch('getUserInfo')
  }

}
</script>

<style>

</style>